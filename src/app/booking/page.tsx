import getCoworkingspaces from "@/libs/Coworkingspace/getCoworkingspaces";
import CreateBookingForm from "./components/CreateBookingForm";

export default async function Booking() {
  const coworkingspaceJson = await getCoworkingspaces()
  const coworkingspaces = await coworkingspaceJson
  return (
    <main className="w-full flex flex-col items-center space-y-8 p-6 md:p-12 bg-gray-100 min-h-screen">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 text-center">Coworkingspace Booking</h1>

      {/* Form */}
      <CreateBookingForm coworkingspaceJson={coworkingspaces}/>
    </main>
  );
}
