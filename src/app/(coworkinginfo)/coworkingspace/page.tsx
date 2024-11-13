import styles from "@/app/page.module.css";
import { LinearProgress } from "@mui/material";
import { Suspense } from "react";
import CoworkingspaceCatalog from "./components/CoworkingspaceCatalog";
import getCoworkingspaces from "@/libs/Coworkingspace/getCoworkingspaces";
import getCoworkingspace from "@/libs/Coworkingspace/getCoworkingspace";

export default async function CoWorkingSpacePage() {
  const coworkingspace = await getCoworkingspaces()
  const tar = await getCoworkingspace("673486745e3330fa58f37948")
     return (
    <main className={styles.main}>
      <Suspense fallback={<LinearProgress/>}>
        <CoworkingspaceCatalog coworkingspaceJson={coworkingspace} />
      </Suspense>
    </main>
  );
}
