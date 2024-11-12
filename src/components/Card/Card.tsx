import Image from 'next/image'; 
import InteractiveCard from './InteractiveCard';

interface CardProps {
    hid : string,
    coworkingspaceName: string;
    imgSrc: string;
}

export default function Card({ hid ,coworkingspaceName, imgSrc }: CardProps) {
    return (
        <InteractiveCard>
            <div className="w-full h-[70%] relative rounded-t-lg">
                <Image 
                    src={imgSrc} 
                    alt={coworkingspaceName}   
                    fill={true}
                    className='object-cover rounded-t-lg'            
                />
            </div>
            <div className="w-full h-[30%] p-[10px] flex flex-col justify-center">
                <p>{coworkingspaceName}</p>
            </div>
        </InteractiveCard>
    );
}
