"use client"
import Link from "next/link"
import Image from 'next/image';
import deleteCoworkingspace from "@/libs/Coworkingspace/deleteCoworkingspace";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface CoworkingspaceDetailProps{
    coworkingspaceData : {
        name: string;
        address: string;
        operatingHours: string;
        province: string;
        postalcode: string;
        tel: string;
        picture: string;
      };
    coworkingspaceId: string;
    isAdmin : boolean;
}

export default function CoworkingSpaceDetail(props : CoworkingspaceDetailProps){
    const { data: session } = useSession();
    const router = useRouter();

    const handleDelete = async( e: React.FormEvent) =>{
        e.preventDefault();
        if(session?.user){
            const userSession = session
            const userToken =userSession?.user?.token
            if(userToken){
                try{
                    const deleted = await deleteCoworkingspace(
                        props.coworkingspaceId,
                        userToken
                    );
                    if(deleted.success){
                        router.push("/coworkingspace")
                    }
                }catch(e){
                    throw new Error("Failed to delete Coworking space")
                }
            }
        }
    }
    return(
        <>
            {/* Title */}
                <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">{props.coworkingspaceData.name}</h1>

            {/* Details Section */}
            <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-8 bg-white shadow-lg rounded-lg p-6 md:p-8">
            {/* Image */}
                <Image
                    src={props.coworkingspaceData.picture}
                    alt={`Coworking space ${props.coworkingspaceId}`}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full md:w-1/3 h-auto rounded-lg object-cover"
                />

            {/* Information */}
            <div className="mt-4 md:mt-0 w-full md:w-2/3 text-left space-y-3">
                <p className="text-lg">
                <span className="font-semibold text-gray-700">Address:</span> {props.coworkingspaceData.address}
                </p>
                <p className="text-lg">
                <span className="font-semibold text-gray-700">Operating Hours:</span> {props.coworkingspaceData.operatingHours}
                </p>
                <p className="text-lg">
                <span className="font-semibold text-gray-700">Province:</span> {props.coworkingspaceData.province}
                </p>
                <p className="text-lg">
                <span className="font-semibold text-gray-700">Postal Code:</span> {props.coworkingspaceData.postalcode}
                </p>
                <p className="text-lg">
                <span className="font-semibold text-gray-700">Telephone:</span> {props.coworkingspaceData.tel}
                </p>
            </div>
            </div>

            {/* Admin Actions */}
            {props.isAdmin && (
            <div className="mt-8 flex justify-center space-x-4">
                {/* Edit Button */}
                <Link href={`/admin/coworkingspace/edit/${props.coworkingspaceId}`}>
                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
                    Edit Coworking Space
                </button>
                </Link>

                {/* Delete Button */}
                <button
                    className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
                    onClick={handleDelete}
                >
                Delete Coworking Space
                </button>
            </div>
            )}
        </>
    )
}