// src/components/SocialProofSection.tsx
function SocialProofSection() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Hecho por alguien que vive optimizando laptops</h2>
        <p className="section-subtitle">
          Laptelligence nace de horas ajustando PCs para gaming, trabajo remoto y uso diario.
          La idea es que tengas un diagnóstico real, sin humo.
        </p>

        <div className="disclaimer-grid">
          <div className="disclaimer-column">
            <h3 className="disclaimer-title">Quién está detrás</h3>
            <ul className="disclaimer-list">
              <li>Experiencia optimizando laptops para CS2 y juegos competitivos.</li>
              <li>Soporte a personas que usan su equipo para trabajar todos los días.</li>
              <li>Obsesión por exprimir rendimiento sin romper nada importante.</li>
              <li>Creado para personas reales, no para admins de servidores.</li>
            </ul>
          </div>

          <div className="disclaimer-column">
            <h3 className="disclaimer-title">Por qué confiar en el reporte</h3>
            <ul className="disclaimer-list">
              <li>Datos tomados directamente de tu sistema, no “suposiciones”.</li>
              <li>Explicaciones en lenguaje normal, sin jerga innecesaria.</li>
              <li>Recomendaciones que podés aplicar en menos de una tarde.</li>
              <li>Sin acceso a tus archivos personales ni a tus contraseñas.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SocialProofSection;
