import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopMenu from "@/components/TopMenu/TopMenu";
import { SessionProvider } from 'next-auth/react';
import Providers  from "./providers";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Captain Buriram Coworking Space Booking App",
  description: "Captain Buriram Coworking Space Booking App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Providers>
         <TopMenu />
         {children}
        </Providers>
      </body>
    </html>
  );
}
