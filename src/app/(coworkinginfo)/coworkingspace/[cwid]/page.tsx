import { mockCoworkingSpace } from "@/constants/constant";
import Image from "next/image";

export default async function hospitalDetailPage({ params }: { params: { cwid: string } }) {
    const coworkingspace = mockCoworkingSpace[parseInt(params.cwid) - 1];

    return (
        <main className="p-6">
            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">{coworkingspace.name}</h1>

            {/* Details Section */}
            <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-8 bg-white shadow-lg rounded-lg p-6 md:p-8">
                {/* Image */}
                <Image
                    src={coworkingspace.picture}
                    alt={`coworking space ${params.cwid}`}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full md:w-1/3 h-auto rounded-lg object-cover"
                />

                {/* Information */}
                <div className="mt-4 md:mt-0 w-full md:w-2/3 text-left space-y-3">
                    <p className="text-lg">
                        <span className="font-semibold text-gray-700">Address:</span> {coworkingspace.address}
                    </p>
                    <p className="text-lg">
                        <span className="font-semibold text-gray-700">Operating Hours:</span> {coworkingspace.operatingHours}
                    </p>
                    <p className="text-lg">
                        <span className="font-semibold text-gray-700">Province:</span> {coworkingspace.province}
                    </p>
                    <p className="text-lg">
                        <span className="font-semibold text-gray-700">Postal Code:</span> {coworkingspace.postalcode}
                    </p>
                    <p className="text-lg">
                        <span className="font-semibold text-gray-700">Telephone:</span> {coworkingspace.tel}
                    </p>
                </div>
            </div>
        </main>
    );
}
