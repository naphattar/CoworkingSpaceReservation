
const API_BASE_URL = process.env.API_URL || 'http://localhost:5000';



const createBooking = async (bookingData :CreateBookingRequest
 
  ): Promise<createBookingResponse> => {
    const API_URL = `${API_BASE_URL}/api/v1/bookings`;
    
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
        body: JSON.stringify(bookingData),
     
    });
  
    if (res.status === 404) {
      throw new Error(`Booking not found.`);
    }

    if (!res.ok) {
      throw new Error(`Failed to get booking.`);
    }
    
    const data = await res.json();
    
    return data;

  };
  
  export default createBooking;