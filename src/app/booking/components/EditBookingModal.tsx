'use client';

import React, { useState,useEffect  } from 'react';
import updateBooking from '@/libs/Booking/updateBooking';
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";


interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking | null;
  onUpdate: (updatedBooking: Booking) => void;
  session : string;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, booking, onUpdate,session }) => {
  
  const [unupdateBooking, setUnupdateDate] = useState(booking?.bookingDate || '');
  const [unupdateRoom, setUnubdateRoom] = useState(booking?.numOfRooms || 1);
  const [date, setDate] = useState(booking?.bookingDate || '');
  const [rooms, setRooms] = useState(booking?.numOfRooms || 1);
  
  useEffect(() => {
    if (booking) {
      setDate(new Date(booking.bookingDate).toISOString().slice(0, 10)); // Format as YYYY-MM-DD
      setUnupdateDate(new Date(booking.bookingDate).toISOString().slice(0, 10));
      setRooms(booking.numOfRooms);
      setUnubdateRoom(booking.numOfRooms)
      
    }
  }, [booking]);

  

  const handleSave = async () => {
    if (!booking || !booking?._id) return;
    

    const updatedBookingRequest = { bookingDate: date, numOfRooms: rooms };
    const updatedBooking = { ...booking, ...updatedBookingRequest };
    
    try {
      const data = await updateBooking(booking._id, updatedBookingRequest,session );

        if(data.success){
            onUpdate(updatedBooking);
            onClose();
            }

        else{
            console.error(data);
        }
      
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-gray-600">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Edit Booking</h2>
        <label className="block mb-2">
          Booking Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border mt-1 p-2 w-full"
          />
        </label>
        <label className="block mb-4">
          Number of Rooms:
          <input
            type="number"
            value={rooms}
            onChange={(e) => setRooms(Number(e.target.value))}
            className="border mt-1 p-2 w-full"
            min={1}
          />
        </label>
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-md">
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded-md"
        disabled={ unupdateBooking === date && unupdateRoom === rooms }
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
