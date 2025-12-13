// src/components/FinalCtaSection.tsx
import { useState } from 'react';

function FinalCtaSection({ isPaid }: { isPaid: boolean }) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handleBuyClick = async () => {
    try {
      setErr(null);
      setLoading(true);

      const res = await fetch('/.netlify/functions/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.url) {
        throw new Error(data?.error || 'No se pudo iniciar el pago.');
      }

      window.location.assign(data.url);
    } catch (e: any) {
      console.error(e);
      setErr(e?.message || 'Error iniciando el pago.');
    } finally {
      // Si Stripe redirige, esto no se llega a notar.
      // Si NO redirige por algún bloqueo, vuelve a habilitar el botón.
      setLoading(false);
    }
  };

  return (
    <section className="section">
      <div className="container">
        <div className="scan-upload-card">
          <h2 className="section-title">¿Listo para entender qué frena tu laptop?</h2>
          <p className="section-subtitle">
            En minutos vas a tener un reporte claro con problemas detectados y un plan de acción paso a paso.
          </p>

          {!isPaid ? (
            <>
              <button className="btn-primary" onClick={handleBuyClick} disabled={loading}>
                {loading ? 'Abriendo pago…' : 'Comprar Scan + Reporte Inteligente'}
              </button>

              <p className="hero-note">
                Pago único. Sin suscripción. Después del pago se desbloquea la descarga del asistente y el reporte completo.
              </p>

              {err && <p className="scan-error">{err}</p>}
            </>
          ) : (
            <>
              <button
                className="btn-primary"
                onClick={() => document.getElementById('scan-upload')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Ya tenés acceso: subir scan y ver reporte completo
              </button>

              <p className="hero-note">
                Si todavía no descargaste el asistente, lo podés bajar desde el bloque “Cómo funciona”.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default FinalCtaSection;
