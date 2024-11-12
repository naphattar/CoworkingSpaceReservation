import { mockCoworkingSpace } from "@/constants/constant"
import Image from "next/image"

export default async function hospitalDetailPage({params} : {params : {cwid : string}}){
    const coworkingspace : CoWorkingSpace = mockCoworkingSpace[parseInt(params.cwid)-1]

    return (
        <main className="text-center p-5">
            <h1 className="text-lg font-medium">{coworkingspace.name}</h1>
            <div className="flex flex-row my-5">
                <Image
                    src={coworkingspace.picture}
                    alt={`hotel${params.cwid}`}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="rounded-lg w-[30%] bg-black"
                />
                <div className="text-left space-y-2 md:w-[70%] p-3">
                    <p className="text-lg">
                        <span className="font-medium">Address:</span> {coworkingspace.address}
                    </p>
                    <p className="text-lg">
                        <span className="font-medium">OperatingHours:</span> {coworkingspace.operatingHours}
                    </p>
                    <p className="text-lg">
                        <span className="font-medium">Province:</span> {coworkingspace.province}
                    </p>
                    <p className="text-lg">
                        <span className="font-medium">Postal Code:</span> {coworkingspace.postalcode}
                    </p>
                    <p className="text-lg">
                        <span className="font-medium">Telephone:</span> {coworkingspace.tel}
                    </p>
                </div>
            </div>
        </main>
    )
};

