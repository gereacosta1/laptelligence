// src/components/Pricing.tsx
function Pricing() {
  const handleBuyClick = () => {
    const el = document.getElementById("scan-upload");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="pricing" className="section">
      <div className="container">
        <h2 className="section-title">Precios claros</h2>
        <p className="section-subtitle">
          Empezamos con una única opción simple. Más adelante se suman servicios extra.
        </p>
        <div className="pricing-grid">
          <div className="pricing-card pricing-card-main">
            <h3 className="pricing-name">Scan + Reporte Inteligente</h3>
            <div className="pricing-price">USD 9.99</div>
            <p className="pricing-description">
              Análisis completo de tu laptop con reporte detallado y plan de acción.
            </p>
            <ul className="pricing-features">
              <li>Diagnóstico completo del sistema</li>
              <li>Lista de problemas detectados</li>
              <li>Plan de acción paso a paso</li>
            </ul>
            <button onClick={handleBuyClick} className="btn-primary">
              Comprar ahora
            </button>
          </div>

          <div className="pricing-card pricing-card-soon">
            <div className="soon-badge">Próximamente</div>
            <h3 className="pricing-name">Optimización manual 1 a 1</h3>
            <div className="pricing-price">TBD</div>
            <p className="pricing-description">
              Sesión remota personalizada con ajustes avanzados, con foco en gaming si lo
              necesitás.
            </p>
            <ul className="pricing-features">
              <li>Sesión remota de 60 minutos</li>
              <li>Ajustes personalizados avanzados</li>
              <li>Optimización específica para tu caso</li>
            </ul>
            <button className="btn-disabled" disabled>
              Próximamente
            </button>
          </div>

          <div className="pricing-card pricing-card-soon">
            <div className="soon-badge">Próximamente</div>
            <h3 className="pricing-name">Auto-Fix automático</h3>
            <div className="pricing-price">TBD</div>
            <p className="pricing-description">
              Versión futura que aplica cambios y optimizaciones automáticamente en tu
              sistema.
            </p>
            <ul className="pricing-features">
              <li>Aplicación automática de mejoras</li>
              <li>Limpieza de archivos innecesarios</li>
              <li>Optimización de configuraciones</li>
            </ul>
            <button className="btn-disabled" disabled>
              Próximamente
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
