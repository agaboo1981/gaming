import { useCallback, useEffect, useState, type ReactNode } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
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
import { LegalScreen } from "./components/screens/LegalScreen";

const SITE_DESC =
  "SALVAGE — orbital extraction shooter. Six factions. Abandoned refineries. One payload leaves the station. Only the team carrying it goes with it.";

const ROUTE_META: Record<string, { title: string; desc: string }> = {
  "/": { title: "SALVAGE — Orbital Extraction Shooter", desc: SITE_DESC },
  "/fiction": {
    title: "Fiction — SALVAGE",
    desc: "Atlas left. You didn't. The story behind the abandoned orbital grid and the six factions fighting over it.",
  },
  "/protocol": {
    title: "Combat Protocol — SALVAGE",
    desc: "Three beats. Zero mercy. Insert, secure, extract — the one-clock match loop of SALVAGE.",
  },
  "/operatives": {
    title: "Operatives — SALVAGE",
    desc: "Pick your ghost. Breacher, recon, engineer, assault — four contractors cleared for deployment.",
  },
  "/sectors": {
    title: "Sectors — SALVAGE",
    desc: "Deployment zones: Refinery Core, Cryo-Vault 4, Shipbreaker Yard, and the Logistics Hub.",
  },
  "/deploy": {
    title: "Deploy — SALVAGE",
    desc: "Get to the station. Free to play on PC, PlayStation 5, and Xbox Series X|S.",
  },
  "/terms": {
    title: "Terms of Service — SALVAGE",
    desc: "The rules of the station: license, fair passage, and service terms for SALVAGE.",
  },
  "/privacy": {
    title: "Privacy Policy — SALVAGE",
    desc: "How Atlas Corporation handles data across the SALVAGE service.",
  },
  "/cookies": {
    title: "Cookie Policy — SALVAGE",
    desc: "What this site stores in your hold — and how to clear it.",
  },
  "/eula": {
    title: "End-User License Agreement — SALVAGE",
    desc: "License terms for the SALVAGE game client.",
  },
};

const NOT_FOUND_META = {
  title: "Signal Lost — SALVAGE",
  desc: "This sector is off the charts. Return to base.",
};

/** Scroll to top on route change; honor in-page hashes when present. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.replace("#", ""));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);
  return null;
}

function ScreenShell({ children }: { children: ReactNode }) {
  return (
    <main id="main" className="relative z-[2] pt-24 md:pt-28">
      {children}
    </main>
  );
}

function NotFound() {
  return (
    <section className="section-pad">
      <div className="container-wide text-center">
        <p className="text-micro text-accent">Signal Lost // 404</p>
        <h1 className="text-display text-[clamp(2.5rem,6vw,4.5rem)] text-bone mt-4">
          Dead Frequency.
        </h1>
        <p className="mt-4 text-fog font-light leading-relaxed">
          This sector is off the charts. The shuttle never left for it.
        </p>
        <Link
          to="/"
          className="btn-press inline-flex items-center mt-8 font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.18em] px-8 py-4 bg-accent text-void clip-notch hover:bg-accent-hot"
        >
          Return to Base
        </Link>
      </div>
    </section>
  );
}

function Site() {
  const location = useLocation();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = useCallback(() => setModalOpen(true), []);
  const goDeploy = useCallback(() => navigate("/deploy"), [navigate]);

  useEffect(() => {
    const meta = ROUTE_META[location.pathname] ?? NOT_FOUND_META;
    document.title = meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", meta.desc);
  }, [location.pathname]);

  return (
    <div className="min-h-screen w-full bg-void text-bone">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <div
        className="fixed inset-0 pointer-events-none z-[1] opacity-[0.03] bg-noise"
        aria-hidden
      />
      <Particles />

      <ScrollProgress />
      <ScrollManager />
      <Navbar onDeploy={goDeploy} />

      <Routes>
        <Route
          path="/"
          element={
            <main id="main" className="relative z-[2]">
              <Hero onDeploy={goDeploy} onTrailer={openModal} />
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
          }
        />
        <Route
          path="/fiction"
          element={
            <ScreenShell>
              <Fiction />
            </ScreenShell>
          }
        />
        <Route
          path="/protocol"
          element={
            <ScreenShell>
              <Loop />
            </ScreenShell>
          }
        />
        <Route
          path="/operatives"
          element={
            <ScreenShell>
              <Operatives />
            </ScreenShell>
          }
        />
        <Route
          path="/sectors"
          element={
            <ScreenShell>
              <Sectors />
            </ScreenShell>
          }
        />
        <Route
          path="/deploy"
          element={
            <ScreenShell>
              <Deploy onTrailer={openModal} />
            </ScreenShell>
          }
        />
        <Route
          path="/terms"
          element={
            <ScreenShell>
              <LegalScreen doc="terms" />
            </ScreenShell>
          }
        />
        <Route
          path="/privacy"
          element={
            <ScreenShell>
              <LegalScreen doc="privacy" />
            </ScreenShell>
          }
        />
        <Route
          path="/cookies"
          element={
            <ScreenShell>
              <LegalScreen doc="cookies" />
            </ScreenShell>
          }
        />
        <Route
          path="/eula"
          element={
            <ScreenShell>
              <LegalScreen doc="eula" />
            </ScreenShell>
          }
        />
        <Route
          path="*"
          element={
            <ScreenShell>
              <NotFound />
            </ScreenShell>
          }
        />
      </Routes>

      <Footer />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Site />
    </BrowserRouter>
  );
}

export default App;
