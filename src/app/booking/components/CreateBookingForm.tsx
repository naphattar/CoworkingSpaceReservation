"use client";

import { useState } from "react";
import { FormControl, TextField } from "@mui/material";
import DateReserve from "./DateReserve";
import { Dayjs } from "dayjs";
import LocationReserve from "./LocationReserve";
import { useSession } from "next-auth/react";
import createBooking from "@/libs/Booking/createBooking";
import { useRouter } from "next/navigation";

export default function CreateBookingForm({ coworkingspaceJson }: { coworkingspaceJson: CoWorkingSpaceJson }) {
  const [numOfRooms, setNumOfRooms] = useState<number>(0);
  const [coworkingspaceId, setCoworkingspaceId] = useState<string>("");
  const [selectDate, setSelectDate] = useState<Dayjs | null>(null);
  const { data: session } = useSession();
  const router = useRouter();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!numOfRooms || numOfRooms < 1 || !selectDate || !coworkingspaceId) {
      alert("Please fill in all required fields.");
      return;
    }

    if (session?.user) {
      const userToken = session?.user?.token;
      if (userToken) {
        try {
          await createBooking(
            {
              bookingDate: selectDate.toString(),
              createdAt: new Date().toISOString(),
              numOfRooms,
            } as CreateBookingRequest,
            coworkingspaceId,
            userToken
          );
          alert("Booking successfully created!");
          router.push("/booking-history")
        } catch (e) {
          console.error("Error creating booking:", e);
          alert("Failed to create booking. Please try again.");
        }
      } else {
        alert("User token is missing. Please log in again.");
      }
    } else {
      alert("You must be logged in to create a booking.");
    }
  };

  return (
    <FormControl className="flex flex-col bg-white rounded-lg shadow-lg space-y-8 w-[90%] max-w-md p-6">
      {/* Header */}
      <h2 className="text-lg font-semibold text-gray-800 text-center">Create a Coworking Space Booking</h2>

      {/* Number of Rooms */}
      <TextField
        variant="outlined"
        name="Number Of Rooms"
        label="Number Of Rooms"
        type="number"
        className="w-full"
        value={numOfRooms}
        onChange={(e) => setNumOfRooms(parseInt(e.target.value))}
        inputProps={{ min: 1, max: 3 }}
      />

      {/* Booking Date */}
      <div className="w-full space-y-2">
        <label className="block text-sm font-medium text-gray-700">Select Booking Date</label>
        <DateReserve onDateChange={(value: Dayjs) => setSelectDate(value)} />
      </div>

      {/* Select Location */}
      <div className="w-full space-y-2">
        <label className="block text-sm font-medium text-gray-700">Select Coworking Space</label>
        <LocationReserve
          locations={coworkingspaceJson.data}
          onLocationChange={(value: string) => setCoworkingspaceId(value)}
        />
      </div>

      {/* Submit Button */}
      <button
        className="block w-full rounded-md bg-sky-600 hover:bg-sky-700 px-4 py-2 shadow-lg text-white font-medium transition duration-300"
        name="Book Coworkingspace"
        onClick={handleSubmit}
      >
        Book Coworkingspace
      </button>
    </FormControl>
  );
}
