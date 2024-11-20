"use client";

import { useEffect, useState } from "react";
import styles from "@/app/page.module.css";
import CoworkingspaceCatalog from "./components/CoworkingspaceCatalog";
import getCoworkingspaces from "@/libs/Coworkingspace/getCoworkingspaces";

export default function CoWorkingSpacePage() {
  const [coworkingspaces, setCoworkingspaces] = useState<CoWorkingSpace[]>([]);

  useEffect(() => {
    const fetchCoworkingspaces = async () => {
      try {
        const coworkingData = await getCoworkingspaces();
        setCoworkingspaces(coworkingData.data);
      } catch (error) {
        console.error("Error fetching coworking spaces:", error);
      } 
    };

    fetchCoworkingspaces();
  }, []);

  if (!coworkingspaces) {
    return <p>Unable to load coworking spaces.</p>;
  }

  return (
    <main className={styles.main}>
      <CoworkingspaceCatalog coworkingspaces={coworkingspaces} />
    </main>
  );
}
