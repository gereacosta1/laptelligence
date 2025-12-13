// src/components/HowItWorks.tsx
import { useState } from "react";

const ACCESS_KEY = "laptelligence_access_token";

function HowItWorks({ isPaid }: { isPaid: boolean }) {
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    try {
      setError(null);

      if (!isPaid) {
        setError("Primero tenés que comprar el análisis para desbloquear la descarga.");
        return;
      }

      const token = window.localStorage.getItem(ACCESS_KEY);
      if (!token) {
        setError("No encuentro tu acceso guardado. Probá volver a validar el pago.");
        return;
      }

      setDownloading(true);

      const res = await fetch("/.netlify/functions/download-assistant", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || "No se pudo descargar el asistente.");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "laptelligence_scan.ps1";
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (e: any) {
      console.error(e);
      setError(e?.message || "Error descargando el asistente.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <section id="how-it-works" className="section">
      <div className="container">
        <h2 className="section-title">Cómo funciona</h2>
        <p className="section-subtitle">
          El objetivo es entender qué frena tu laptop y qué podés mejorar, sin necesidad de ser técnico.
        </p>

        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3 className="step-title">Comprás el análisis</h3>
            <p className="step-description">
              Pagás de forma segura con tarjeta mediante Stripe. Tenés acceso inmediato a las instrucciones.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">2</div>
            <h3 className="step-title">Ejecutás el escaneo</h3>
            <p className="step-description">
              Descargás un asistente liviano que recopila datos básicos (rendimiento, procesos, espacio en disco, etc.).
              No accede a tus archivos personales.
            </p>

            <button
              type="button"
              className="step-download"
              onClick={handleDownload}
              disabled={!isPaid || downloading}
              style={{
                opacity: !isPaid || downloading ? 0.6 : 1,
                cursor: !isPaid || downloading ? "not-allowed" : "pointer",
                border: "none",
              }}
            >
              {downloading
                ? "Descargando…"
                : isPaid
                ? "Descargar asistente para Windows"
                : "Comprar para desbloquear descarga"}
            </button>

            {!isPaid && (
              <p className="step-helper" style={{ marginTop: 10 }}>
                La descarga se habilita automáticamente después del pago.
              </p>
            )}

            {error && <p className="scan-error" style={{ marginTop: 10 }}>{error}</p>}

            <p className="step-helper">
              Después de descargarlo, buscá el archivo <code>laptelligence_scan.ps1</code> en tu carpeta de Descargas,
              hacé clic derecho y elegí <strong>“Ejecutar con PowerShell”</strong>. El asistente sólo lee métricas de rendimiento
              y genera un archivo <code>laptelligence_scan.json</code> en tu Escritorio.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">3</div>
            <h3 className="step-title">Recibís tu reporte inteligente</h3>
            <p className="step-description">
              En base a los datos generamos un reporte claro con conclusiones y una lista de acciones recomendadas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
