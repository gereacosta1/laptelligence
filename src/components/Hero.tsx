// src/components/Hero.tsx
function Hero() {
  const handleBuyClick = () => {
    const el = document.getElementById("scan-upload");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-left">
            <h1 className="hero-title">
              Escaneá tu laptop e identificá qué la está frenando en minutos.
            </h1>
            <p className="hero-description">
              Laptelligence analiza el estado real de tu laptop y genera un reporte claro:
              qué está bien, qué está mal y qué podés hacer hoy para mejorar rendimiento,
              limpiar basura y preparar tu equipo para trabajar o jugar.
            </p>
            <div className="hero-cta">
              <button onClick={handleBuyClick} className="btn-primary">
                Comprar Scan + Reporte Inteligente
              </button>
              <p className="price-text">Lanzamiento: USD 9.99 · pago único</p>
            </div>
            <p className="hero-note">
              Sin suscripción, sin promesas raras. Solo un diagnóstico honesto y
              recomendaciones concretas.
            </p>
          </div>
          <div className="hero-right">
            <div className="dashboard-card">
              <h3 className="dashboard-title">Estado de tu laptop</h3>
              <div className="dashboard-metrics">
                <div className="metric">
                  <span className="metric-label">Uso de RAM</span>
                  <span className="metric-value">
                    <span className="status-badge status-high">Alto</span> 86%
                  </span>
                </div>
                <div className="metric">
                  <span className="metric-label">Programas en segundo plano</span>
                  <span className="metric-value">
                    <span className="status-badge status-warning">
                      11 procesos críticos
                    </span>
                  </span>
                </div>
                <div className="metric">
                  <span className="metric-label">Espacio en disco</span>
                  <span className="metric-value">120 GB libres</span>
                </div>
                <div className="metric">
                  <span className="metric-label">Temperatura promedio</span>
                  <span className="metric-value">
                    <span className="status-badge status-high">Alta</span> 92 ºC
                  </span>
                </div>
                <div className="metric">
                  <span className="metric-label">Modo gaming</span>
                  <span className="metric-value">
                    <span className="status-badge status-warning">
                      No optimizada
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
