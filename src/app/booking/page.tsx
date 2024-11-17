

import styles from "@/app/page.module.css";
import getBookings from "@/libs/Booking/getBookings";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getSession } from 'next-auth/react';
import { getServerSession } from "next-auth";
import BookingList from "./components/BookingList";
import { Suspense } from "react";


export default async function CoWorkingSpacePage() {
    const session = await getServerSession(authOptions)
    if(!session || !session.user.token) return null;

    const booking = await getBookings(session.user.token)


     return (
    <main className={styles.main}>
        <Suspense >
        <BookingList bookings={booking} session = {session}  />
        </Suspense>
    </main>
  );
}
