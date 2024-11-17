'use client';

import React, { useState, useEffect } from 'react';
import EditModal from './EditBookingModal';
import deleteBooking from '@/libs/Booking/deleteBooking';
import { Session } from "next-auth";
import { motion,AnimatePresence } from 'framer-motion';

const BookingList: React.FC<{ bookings: getBookingsResponse, session: Session }> = ({ bookings, session }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [updatedBookings, setUpdatedBookings] = useState(bookings.data);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    setIsFirstRender(false); // Disable initial render after mounting
  }, []);

  // Disable scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      // Disable scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Enable scroll
      document.body.style.overflow = 'auto';
    }

    // Cleanup to reset overflow when the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);



  const handleEditClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleUpdate = (updatedBooking: Booking) => {
    setUpdatedBookings((prev) =>
      prev.map((b) => (b._id === updatedBooking._id ? updatedBooking : b))
    );
  };

  const handleDelete = async (bookingId: string) => {

    if(bookingId === undefined) return;


    if (confirm('Are you sure you want to delete this booking?')) {
      try {
        const data =  await deleteBooking(bookingId, session.user.token);

        if (data.success) {
          setUpdatedBookings((prev) =>
            prev.filter((booking) => booking._id !== bookingId)
          );
        } else {
          console.error('Error deleting booking:', data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  if (!bookings.success || bookings.count === 0) {
    return <div className="text-center text-red-500">No bookings available</div>;
  }

  return (
    <div className="space-y-4 p-4">
        <AnimatePresence>
      {updatedBookings.map((booking) => (
        <motion.div
          key={booking._id}
          className="border p-4 rounded-lg shadow-lg bg-white"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <motion.h2
            className="text-gray-700 text-xl font-semibold"
            key={booking.bookingDate} // Trigger reanimation on date change
            initial={isFirstRender ? false : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {`Booking Date: ${new Date(booking.bookingDate).toLocaleDateString('th')}`}
          </motion.h2>

          <motion.p
            className="text-gray-600"
            key={booking.numOfRooms} // Trigger reanimation on rooms change
            initial={isFirstRender ? false : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Number of Rooms: {booking.numOfRooms}
          </motion.p>
          
          <div className="mt-4">
            <h3 className="text-gray-700 font-semibold text-lg">Co-Working Space</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div className="space-y-2">
                <p className="text-gray-600">Name: {booking.coworkingspace.name}</p>
                <p className="text-gray-600">Address: {booking.coworkingspace.address}</p>
                <p className="text-gray-600">Phone: {booking.coworkingspace.tel}</p>
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={() => handleEditClick(booking)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(booking._id as string)}
              className="px-4 py-2 bg-red-500 text-white rounded-md"
            >
              Delete
            </button>
          </div>
        </motion.div>
      ))}
      <EditModal
        isOpen={isModalOpen}
        onClose={() => {setIsModalOpen(false);setSelectedBooking(null);} }
        booking={selectedBooking}
        onUpdate={handleUpdate}
        session={session}
      />
      </AnimatePresence>
    </div>
  );
};

export default BookingList;
