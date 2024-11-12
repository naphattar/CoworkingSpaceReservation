import Image from "next/image";
import TopMenuItem from "./TopMenuItem";

export default function TopMenu() {
    return (
        <div className="fixed top-0 left-0 right-0 z-30 flex justify-between h-16 p-4 items-center bg-white shadow-md space-x-8">
            {/* Left Side: Title Text */}
            <div className="text-lg font-semibold whitespace-nowrap truncate p-6">
                Captain Buriram
            </div>

            {/* Right Side: Menu Items and Logo */}
            <div className="flex items-center space-x-8">
                <TopMenuItem title={"Booking"} pageRef={"/booking"} />
                <Image 
                    src={"/img/logo.jpg"} 
                    alt={"logo"}
                    width={30}
                    height={30}
                />
            </div>
        </div>
    );
}
