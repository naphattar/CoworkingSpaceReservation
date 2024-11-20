"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import CoworkingSpaceDetail from "./components/CoworkingspaceDetail";
import getCoworkingspace from "@/libs/Coworkingspace/getCoworkingspace";
import getUserProfile from "@/libs/auth/getUserProfile";

export default function CoworkingSpaceDetailPage({ params }: { params: { cwid: string } }) {
  const [coworkingspace, setCoworkingspace] = useState<CoWorkingSpace>();
  const [isAdmin, setIsAdmin] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
      return;
    }
    const fetchData = async () => {
      try {
        const coworkingData = await getCoworkingspace(params.cwid);
        setCoworkingspace(coworkingData.data);

        if (session?.user?.token) {
          const userProfile = await getUserProfile(session.user.token);
          setIsAdmin(userProfile.data.role === "admin");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.cwid, session, status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!coworkingspace) {
    return <p>Unable to load coworking space details.</p>;
  }

  return (
    <main className="p-6">
      <CoworkingSpaceDetail
        coworkingspaceId={params.cwid}
        coworkingspaceData={{
          name: coworkingspace.name,
          address: coworkingspace.address,
          operatingHours: coworkingspace.operatingHours,
          province: coworkingspace.province,
          postalcode: coworkingspace.postalcode,
          tel: coworkingspace.tel,
          picture: coworkingspace.picture,
        }}
        isAdmin={isAdmin}
      />
    </main>
  );
}
