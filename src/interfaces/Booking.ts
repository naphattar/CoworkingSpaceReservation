


interface CreateBookingRequest {
    bookingDate: string;
    numOfRooms: number;
    createdAt?: string;
  }
  

interface Booking {
    _id?: string;
    bookingDate: string; // Use `Date` instead of `string` if you parse this into a `Date` object
    numOfRooms: number;
    user: string;
    coworkingspace: CoWorkingSpace;
    createdAt: string; // Same as above, replace with `Date` if parsed
    __v?: number;
}

interface getBookingsResponse {
    success: boolean;
    count: number;
    data: Booking[];
}

interface createBookingResponse {
    success: boolean;
    data: Booking | string;
}

interface getBookingResponse {
    success: boolean;
    data: Booking;
}

interface deleteBookingResponse {
    success: boolean;
    data: {};
}