

import styles from "@/app/page.module.css";
import getBookings from "@/libs/Booking/getBookings";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getSession } from 'next-auth/react';
import { getServerSession } from "next-auth";

export default async function CoWorkingSpacePage() {
    const session = await getServerSession(authOptions)
    if(!session || !session.user.token) return null;

    const booking = await getBookings(session.user.token)
    console.log(`booking`, booking);
    // const session = await getSession();
    // console.log(`session`, session?.user.token);
     return (
    <main className={styles.main}>
        
    </main>
  );
}
