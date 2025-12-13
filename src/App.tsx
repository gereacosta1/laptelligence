// src/App.tsx
import { useEffect, useMemo, useState } from 'react';
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

const ACCESS_KEY = 'laptelligence_access_token';

function App() {
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem(ACCESS_KEY);
  });

  const [payStatusMsg, setPayStatusMsg] = useState<string | null>(null);

  const isPaid = useMemo(() => Boolean(accessToken), [accessToken]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get('session_id');
    const canceled = params.get('canceled');

    if (canceled) {
      setPayStatusMsg('Pago cancelado. Si querés, podés intentar de nuevo.');
    }

    if (!sessionId) return;

    (async () => {
      try {
        setPayStatusMsg('Verificando pago con Stripe…');

        const res = await fetch(
          `/.netlify/functions/verify-session?session_id=${encodeURIComponent(sessionId)}`
        );

        const data = await res.json();

        if (!res.ok || !data?.ok || !data?.accessToken) {
          setPayStatusMsg('No se pudo validar el pago. Si ya pagaste, avisame y lo revisamos.');
          return;
        }

        window.localStorage.setItem(ACCESS_KEY, data.accessToken);
        setAccessToken(data.accessToken);
        setPayStatusMsg('Pago confirmado. Acceso desbloqueado.');

        // Limpiar URL (sacar session_id / canceled)
        params.delete('session_id');
        params.delete('canceled');
        const clean =
          window.location.pathname +
          (params.toString() ? `?${params.toString()}` : '') +
          window.location.hash;

        window.history.replaceState({}, '', clean);

        // Llevar a la sección de upload
        document.getElementById('scan-upload')?.scrollIntoView({ behavior: 'smooth' });
      } catch (e) {
        console.error(e);
        setPayStatusMsg('Error validando el pago. Probá refrescar y, si sigue, lo revisamos.');
      }
    })();
  }, []);

  return (
    <div className="app">
      <Navbar />
      <Hero />
      <WhySlowSection />
      <HowItWorks isPaid={isPaid}/>

      <ReportFeatures />
      <SocialProofSection />
      <Pricing />

      {payStatusMsg && (
        <div className="container" style={{ marginTop: 12 }}>
          <div className="scan-upload-card">
            <p className="section-subtitle" style={{ margin: 0 }}>{payStatusMsg}</p>
          </div>
        </div>
      )}

      <ScanUpload isPaid={isPaid} />
      <FaqSection />
      <ExpectationDisclaimer />
      <FinalCtaSection isPaid={isPaid} />
      <Footer />
    </div>
  );
}

export default App;
