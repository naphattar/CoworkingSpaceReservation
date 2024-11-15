"use client";

import Image from "next/image";
import TopMenuItem from "./TopMenuItem";
import { useSession } from 'next-auth/react';


export default function TopMenu() {
    const { data: session, status } = useSession();
    return (
        <div className="fixed top-0 left-0 right-0 z-30 flex justify-between h-16 p-4 px-10 items-center bg-white shadow-md space-x-8">
            <div className="text-xl font-bold text-gray-800 whitespace-nowrap truncate px-4 py-2 hover:text-blue-600 transition duration-300 ease-in-out">
                Captain Buriram
            </div>

            <div className="flex items-center space-x-8">
                <TopMenuItem 
                    title={"Home"} 
                    pageRef={"/"} 
                />
                <TopMenuItem 
                    title={"Booking"} 
                    pageRef={"/booking"} 
                />
                {status === 'loading' ? (
                    null
                    ) : session ? (
                    <TopMenuItem 
                        title={"Admin"} 
                        pageRef={"/admin"}
                    />
                    ) : null
                }
                {status === 'loading' ? (
                    <TopMenuItem 
                        title={"login"} 
                        pageRef={"/api/auth/signin?callbackUrl=/"} 
                    /> 
                    ) : session ? (
                    <TopMenuItem 
                        title={"logout"} 
                        pageRef={"/api/auth/signout"}
                    />
                    ) : (
                    <TopMenuItem 
                        title={"login"} 
                        pageRef={"/api/auth/signin?callbackUrl=/"} 
                        /> 
                    )
                    
                }
                <div className="p-1 rounded-full border border-gray-300 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
                    <Image 
                        src={"/img/logo.jpg"} 
                        alt={"logo"}
                        width={30}
                        height={30}
                        className="rounded-full"
                    />
                </div>
            </div>
        </div>
    );
}
