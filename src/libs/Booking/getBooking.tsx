
const API_BASE_URL = process.env.API_URL || 'http://localhost:5000';



const getBooking = async (
    id: string
  ): Promise<getBookingResponse> => {
    const API_URL = `${API_BASE_URL}/api/v1/bookings/${id}`;
    
    const res = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
     
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
  
  export default getBooking;