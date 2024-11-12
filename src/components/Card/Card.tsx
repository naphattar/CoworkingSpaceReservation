import Image from 'next/image';
import InteractiveCard from './InteractiveCard';

interface CardProps {
    hid: string;
    coworkingspaceName: string;
    imgSrc: string;
}

export default function Card({ hid, coworkingspaceName, imgSrc }: CardProps) {
    return (
        <InteractiveCard>
            <div className="w-full h-[70%] relative">
                <Image 
                    src={imgSrc} 
                    alt={coworkingspaceName}   
                    fill={true}
                    className="object-cover w-full h-full"
                />
            </div>
            <div className="w-full h-[30%] p-4 flex items-center justify-center bg-gray-100">
                <p className="text-center font-semibold text-gray-800 text-lg truncate">
                    {coworkingspaceName}
                </p>
            </div>
        </InteractiveCard>
    );
}
