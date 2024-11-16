
const API_BASE_URL = process.env.API_URL || 'http://localhost:5000';



const updateBooking = async (
    bookingId: string,
    updatedData: CreateBookingRequest,
  ): Promise<createBookingResponse> => {
    const API_URL = `${API_BASE_URL}/api/v1/bookings/${bookingId}`;
    
    const res = await fetch(API_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
  
    if (res.status === 404) {
      throw new Error(`Booking with ID ${bookingId} not found.`);
    }
  
    if (!res.ok) {
      throw new Error(`Failed to update booking with ID ${bookingId}.`);
    }
  
    const data = await res.json();
    
    return data;

  };
  
  export default updateBooking;