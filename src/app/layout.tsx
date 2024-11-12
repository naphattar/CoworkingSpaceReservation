import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopMenu from "@/components/TopMenu/TopMenu";

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
      <body className={inter.className}>
        <TopMenu/>
        {children}
      </body>
    </html>
  );
}
