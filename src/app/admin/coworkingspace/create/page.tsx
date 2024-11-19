import CreateCoworkingSpaceForm from "../../components/CreateCoworkingspaceForm";
import { checkPermission } from "@/libs/utils";


export default async function AdminPage() {
  await checkPermission('admin')
    return (
      <main className="flex min-h-screen flex-col items-center justify-start">
          <CreateCoworkingSpaceForm/>
      </main>
    );
  }