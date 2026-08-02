import { useCallback, useState } from "react";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { ScrollProgress } from "./components/system/ScrollProgress";
import { Particles } from "./components/system/Particles";
import { Ticker } from "./components/system/Ticker";
import { Modal } from "./components/system/Modal";
import { StatusBanner } from "./components/system/StatusBanner";
import { Hero } from "./components/sections/Hero";
import { Intel } from "./components/sections/Intel";
import { Community } from "./components/sections/Community";
import { Fiction } from "./components/sections/Fiction";
import { Loop } from "./components/sections/Loop";
import { Operatives } from "./components/sections/Operatives";
import { Sectors } from "./components/sections/Sectors";
import { Deploy } from "./components/sections/Deploy";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = useCallback(() => setModalOpen(true), []);
  const scrollDeploy = useCallback(() => {
    document.getElementById("deploy")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen w-full bg-void text-bone">
      <a href="#hero" className="skip-link">
        Skip to content
      </a>

      <div
        className="fixed inset-0 pointer-events-none z-[1] opacity-[0.03] bg-noise"
        aria-hidden
      />
      <Particles />

      <ScrollProgress />
      <Navbar onDeploy={scrollDeploy} />

      <main id="main" className="relative z-[2]">
        <Hero onDeploy={scrollDeploy} onTrailer={openModal} />
        <StatusBanner onTrailer={openModal} />
        <Intel />
        <Ticker />
        <Fiction />
        <Loop />
        <Operatives />
        <Sectors />
        <Community />
        <Deploy onTrailer={openModal} />
      </main>

      <Footer />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

export default App;
