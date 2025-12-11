// src/App.tsx
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import ReportFeatures from './components/ReportFeatures';
import Pricing from './components/Pricing';
import ExpectationDisclaimer from './components/ExpectationDisclaimer';
import Footer from './components/Footer';
import ScanUpload from './components/ScanUpload';

import WhySlowSection from './components/WhySlowSection';
import SocialProofSection from './components/SocialProofSection';
import FaqSection from './components/FaqSection';
import FinalCtaSection from './components/FinalCtaSection';

import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      {/* Bloque corto explicando el problema */}
      <WhySlowSection />
      {/* 3 pasos con descarga (más adelante, solo después de pagar) */}
      <HowItWorks />
      {/* Qué incluye el reporte, con enfoque en valor */}
      <ReportFeatures />
      {/* Confianza / quién está detrás */}
      <SocialProofSection />
      {/* Precios, con foco en el plan principal */}
      <Pricing />
      {/* Zona de uso para clientes que ya compraron */}
      <ScanUpload />
      {/* Dudas antes de comprar */}
      <FaqSection />
      {/* Alineado con expectativas reales */}
      <ExpectationDisclaimer />
      {/* Empujón final a la compra */}
      <FinalCtaSection />
      <Footer />
    </div>
  );
}

export default App;
