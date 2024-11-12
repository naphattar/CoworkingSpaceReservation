import Image from "next/image";
import TopMenuItem from "./TopMenuItem";

export default function TopMenu() {
    return (
        <div className="fixed top-0 left-0 right-0 z-30 flex justify-end h-16 p-4 pr-10 items-center bg-white shadow-md space-x-8">
            <TopMenuItem title={"Booking"} pageRef={"/booking"}/>
            <Image 
                src={"/img/logo.jpg"} 
                alt={"logo"}
                width={30}
                height={30}
            />
        </div>
    );
}