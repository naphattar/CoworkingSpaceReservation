import styles from "@/app/page.module.css";
import { LinearProgress } from "@mui/material";
import { Suspense } from "react";
import CoworkingspaceCatalog from "./components/CoworkingspaceCatalog";
import getCoworkingspaces from "@/libs/Coworkingspace/getCoworkingspaces";
import { refetchPage } from "@/libs/utils";

export default async function CoWorkingSpacePage() {
  await refetchPage()
  const coworkingspace = await getCoworkingspaces()
     return (
    <main className={styles.main}>
      <Suspense fallback={<LinearProgress/>}>
        <CoworkingspaceCatalog coworkingspaceJson={coworkingspace} />
      </Suspense>
    </main>
  );
}
