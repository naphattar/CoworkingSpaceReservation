import getCoworkingspaces from "@/libs/Coworkingspace/getCoworkingspaces";
import Link from "next/link";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import {checkPermission} from "@/libs/utils";


export default async function AdminPage() {

  const session = await getServerSession(authOptions)
  await checkPermission('admin')

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gray-100 p-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      {/* Navigation Button */}
      <div className="w-full max-w-6xl mb-6 flex justify-center">
        <Link
          href="/admin/coworkingspace/create"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
        >
          Create Coworking Space
        </Link>
      </div>
    </main>
  );
}
