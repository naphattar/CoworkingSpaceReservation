import Banner from "@/components/Banner/Banner";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
        <Banner/>
        <div className="flex-grow" />
        <Footer />
    </main>
  );
}
