import Image from 'next/image';
import InteractiveCard from './InteractiveCard';

interface CardProps {
    coworkingspaceName: string;
    imgSrc: string;
}

export default function Card({ coworkingspaceName, imgSrc }: CardProps) {
    return (
        <InteractiveCard>
            <div className="relative w-full h-[70%] overflow-hidden rounded-t-lg">
                <Image 
                    src={imgSrc} 
                    alt={coworkingspaceName}   
                    fill={true}
                    className="object-cover w-full h-full transition-transform duration-300 ease-in-out transform hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
            </div>
            <div className="w-full h-[30%] p-4 flex items-center justify-center bg-white shadow-lg rounded-b-lg">
                <p className="text-center font-semibold text-gray-800 text-lg truncate">
                    {coworkingspaceName}
                </p>
            </div>
        </InteractiveCard>
    );
}
