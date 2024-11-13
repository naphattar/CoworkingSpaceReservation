import styles from "@/app/page.module.css";
import { LinearProgress } from "@mui/material";
import { Suspense } from "react";
import CoworkingspaceCatalog from "./components/CoworkingspaceCatalog";
import getCoworkingspaces from "@/libs/getCoworkingspace";

export default async function CoWorkingSpacePage() {
  const coworkingspace = await getCoworkingspaces()
     return (
    <main className={styles.main}>
      <Suspense fallback={<LinearProgress/>}>
        <CoworkingspaceCatalog coworkingspaceJson={coworkingspace} />
      </Suspense>
    </main>
  );
}
