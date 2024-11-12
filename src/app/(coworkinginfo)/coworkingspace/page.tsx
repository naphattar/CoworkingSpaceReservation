import styles from "@/app/page.module.css";
import { LinearProgress } from "@mui/material";
import { Suspense } from "react";
import CoworkingspaceCatalog from "./components/CoworkingspaceCatalog";

export default async function CoWorkingSpacePage() {
     return (
    <main className={styles.main}>
      <Suspense fallback={<LinearProgress/>}>
        <CoworkingspaceCatalog/>
      </Suspense>
    </main>
  );
}
