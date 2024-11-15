import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { SessionUser } from "@/interfaces/Authentication";
import getCoworkingspace from "@/libs/Coworkingspace/getCoworkingspace";
import { getServerSession } from "next-auth";
import EditCoworkingspaceForm from "../components/EditCoworkingspaceForm";

export default async function EditCoworkingspacePage({ params }: { params: { cwid: string } }) {
  const coworkingspace = await getCoworkingspace(params.cwid);
  const session: SessionUser | null = await getServerSession(authOptions);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Edit Coworking Space</h1>
      <EditCoworkingspaceForm
        initialData={{
          name: coworkingspace.data.name,
          address: coworkingspace.data.address,
          operatingHours: coworkingspace.data.operatingHours,
          province: coworkingspace.data.province,
          postalcode: coworkingspace.data.postalcode,
          tel: coworkingspace.data.tel,
          picture: coworkingspace.data.picture,
        }}
        coworkingspaceId={params.cwid}
      />
    </main>
  );
}
