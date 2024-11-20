"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import BookingList from "./components/BookingList";
import getBookings from "@/libs/Booking/getBookings";

export default function CoWorkingSpacePage() {
  const { data: session, status } = useSession();
  const [bookings, setBookings] = useState<getBookingsResponse>();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
      return;
    }
    const fetchBookings = async () => {
      if (session?.user?.token) {
        try {
          const bookingData = await getBookings(session.user.token);
          setBookings(bookingData);
        } catch (error) {
          console.error("Failed to fetch bookings:", error);
        }
      }
    };

    fetchBookings();
  }, [session, status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <main className="flex flex-col items-center space-y-8 p-6 md:p-12 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Your Bookings</h1>
      {bookings && session &&  bookings?.count > 0 ? (
        <BookingList bookings={bookings} session={session} />
      ) : (
        <p>No bookings found.</p>
      )}
    </main>
  );
}
