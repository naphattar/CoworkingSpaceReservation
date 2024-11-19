import getUserProfile from "@/libs/auth/getUserProfile";
import getCoworkingspace from "@/libs/Coworkingspace/getCoworkingspace";
import { getServerSession } from "next-auth";
import CoworkingSpaceDetail from "./components/CoworkingspaceDetail";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export default async function CoworkingSpaceDetailPage({ params }: { params: { cwid: string } }) {
  const coworkingspace = await getCoworkingspace(params.cwid);
  const session = await getServerSession(authOptions);
  let isAdmin = false;
  if (session?.user?.token) {
    try {
      const userProfile = await getUserProfile(session.user.token);
      isAdmin = userProfile.data.role === "admin";
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  }

  return (
    <main className="p-6">
      <CoworkingSpaceDetail
        coworkingspaceId={params.cwid} 
        coworkingspaceData={coworkingspace.data}
        isAdmin={isAdmin}      
      />
    </main>
  );
}
