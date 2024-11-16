"use client"
import { useState } from "react";
import { FormControl, TextField } from "@mui/material"
import DateReserve from "./DateReserve"
import { Dayjs } from "dayjs";
import LocationReserve from "./LocationReserve";
import { useSession } from "next-auth/react";
import { SessionUser } from "@/interfaces/Authentication";
import createBooking from "@/libs/Booking/createBooking";


export default function CreateBookingForm({coworkingspaceJson} : {coworkingspaceJson :CoWorkingSpaceJson}){
  const [numOfRooms, setNumOfRooms] = useState<number>(0)
  const [coworkingspaceId, setCoworkingspaceId] = useState<string>("");
  const [selectDate, setSelectDate] = useState<Dayjs | null>(null);
  const { data: session } = useSession();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(session?.user){
        const userSession : SessionUser = session
        const userToken =userSession?.user?.token
        if(userToken && selectDate){
          try{
            await createBooking(
             {
                bookingDate : selectDate.toString(),
                createdAt : new Date().toString(),
                numOfRooms : numOfRooms

             } as CreateBookingRequest,
             coworkingspaceId,
             userToken
            );
          }catch(e){
            throw new Error("Failed to create new Booking")
          }
        }
    }
  }
    return(
        <FormControl className="flex flex-col bg-white rounded-lg shadow-md space-y-8 w-[90%] max-w-[400px] p-6">
            {/* Number of Rooms */}
            <TextField
            variant="outlined"
            name="Number Of Rooms"
            label="Number Of Rooms"
            type="number"
            className="w-full"
            value={numOfRooms}
            onChange={(e) => setNumOfRooms(parseInt(e.target.value))}
            inputProps={{ min: 0 , max : 3 }}
            />

            {/* Select Booking Date */}
            <div className="w-full space-y-2">
            <label className="block text-sm font-medium text-gray-700">Select Booking Date</label>
            <DateReserve onDateChange={(value: Dayjs) => setSelectDate(value)} />
            <label className="text-sm text-left text-gray-700">Select Booking Hospital</label>
            <LocationReserve locations={coworkingspaceJson.data} onLocationChange={(value : string) => setCoworkingspaceId(value)} />
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
    )
}