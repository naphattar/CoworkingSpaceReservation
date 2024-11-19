
const API_BASE_URL = process.env.API_URL || 'http://localhost:5000';

import { makeFetchDelay } from "../utils";

const updateBooking = async (
  bookingId: string,
  updatedBooking: CreateBookingRequest,
  token: string
): Promise<createBookingResponse> => {
  const API_URL = `${API_BASE_URL}/api/v1/bookings/${bookingId}`;
  makeFetchDelay();
  try {

    const res = await fetch(API_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updatedBooking),
    });

    if (res.status === 404) {
      throw new Error(`Booking with ID ${bookingId} not found.`);
    }

    if (!res.ok) {
      throw new Error(`Failed to update booking with ID ${bookingId}.`);
    }

    const data = await res.json();

    return data;
  }
  catch (error) {
    console.error(error);
    throw error;
  }

};

export default updateBooking;