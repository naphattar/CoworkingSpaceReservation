import Image from "next/image";
import TopMenuItem from "./TopMenuItem";

export default function TopMenu() {
    return (
        <div className="fixed top-0 left-0 right-0 z-30 flex justify-between h-16 p-4 px-10 items-center bg-white shadow-md space-x-8">
            {/* Left Side: Title Text */}
            <div className="text-xl font-bold text-gray-800 whitespace-nowrap truncate px-4 py-2 hover:text-blue-600 transition duration-300 ease-in-out">
                Captain Buriram
            </div>

            {/* Right Side: Menu Items and Logo */}
            <div className="flex items-center space-x-8">
                <TopMenuItem 
                    title={"Booking"} 
                    pageRef={"/booking"} 
                />
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
