import Link from "next/link";
import styles from '@/app/page.module.css';
import Card from "@/components/Card/Card";
import { mockCoworkingSpace } from "@/constants/constant";


export default async function CoworkingspaceCatalog(){
    return (
        <div className={styles.cardcontainer}>
            {mockCoworkingSpace.map((coworkingspace) => (
                <Link href={`/coworkingspace/${coworkingspace.id}`} className="w-1/5" >
                    <Card
                        key={coworkingspace.id}
                        hid={coworkingspace.id}
                        coworkingspaceName={coworkingspace.name}
                        imgSrc={coworkingspace.picture}
                        />
                </Link>
            ))}
        </div>
    );
}