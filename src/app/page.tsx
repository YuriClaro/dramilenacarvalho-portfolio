import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Equipamentos } from "@/components/equipamentos";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Portfolio } from "@/components/portfolio";
import { Services } from "@/components/services";
import { WhatsAppFloat } from "@/components/whatsapp-float";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Equipamentos />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
