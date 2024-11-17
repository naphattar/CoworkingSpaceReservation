'use client';

import React, { useState } from 'react';
import EditModal from './EditBookingModal';

const BookingList: React.FC<{ bookings: getBookingsResponse,session : string }> = ({ bookings,session }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [updatedBookings, setUpdatedBookings] = useState(bookings.data);

  const handleEditClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleUpdate = (updatedBooking: Booking) => {
    setUpdatedBookings((prev) =>
      prev.map((b) => (b._id === updatedBooking._id ? updatedBooking : b))
    );
  };

  if (!bookings.success || bookings.count === 0) {
    return <div className="text-center text-red-500">No bookings available</div>;
  }

  return (
    <div className="space-y-4 p-4">
      {updatedBookings.map((booking) => (
        <div key={booking._id} className="border p-4 rounded-lg shadow-lg bg-white">
          <h2 className="text-gray-700 text-xl font-semibold">{`Booking Date: ${new Date(booking.bookingDate).toLocaleDateString()}`}</h2>
          <p className="text-gray-600">User: {booking.user}</p>
          <p className="text-gray-600">Number of Rooms: {booking.numOfRooms}</p>
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
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => handleEditClick(booking)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Edit
            </button>
          </div>
        </div>
      ))}
      <EditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        booking={selectedBooking}
        onUpdate={handleUpdate}
        session = {session}
      />
    </div>
  );
};

export default BookingList;
