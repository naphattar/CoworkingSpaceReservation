import Link from "next/link";
import Card from "@/components/Card/Card";

export default async function CoworkingspaceCatalog({coworkingspaceJson} : {coworkingspaceJson :Promise<CoWorkingSpaceJson>}) {
    const coworkingspace = await coworkingspaceJson
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {coworkingspace.data.map((coworkingspace) => (
                <Link
                    href={`/coworkingspace/${coworkingspace.id}`}
                    key={coworkingspace.id}
                    className="transform transition-transform duration-300 hover:scale-105"
                >
                    <Card
                        hid={coworkingspace.id}
                        coworkingspaceName={coworkingspace.name}
                        imgSrc={coworkingspace.picture}
                    />
                </Link>
            ))}
        </div>
    );
}
