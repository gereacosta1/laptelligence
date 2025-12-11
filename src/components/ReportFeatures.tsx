// src/components/ReportFeatures.tsx
function ReportFeatures() {
  return (
    <section id="report-features" className="section section-alt">
      <div className="container">
        <h2 className="section-title">Qué incluye el Reporte Inteligente</h2>
        <p className="section-subtitle">
          No vas a ver gráficos que no entiendas. El foco es que sepas qué hacer.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <h3 className="feature-title">Diagnóstico general</h3>
            <p className="feature-description">
              Análisis completo de rendimiento, uso de recursos, temperatura y estabilidad del sistema.
              Todo explicado en lenguaje claro.
            </p>
          </div>
          <div className="feature-card">
            <h3 className="feature-title">Problemas detectados</h3>
            <p className="feature-description">
              Lista específica de programas pesados, procesos innecesarios, falta de espacio y
              configuraciones ineficientes que están afectando tu laptop.
            </p>
          </div>
          <div className="feature-card">
            <h3 className="feature-title">Plan de acción paso a paso</h3>
            <p className="feature-description">
              Instrucciones claras y concretas que podés seguir incluso si no sabés de computadoras.
              Sin tecnicismos innecesarios.
            </p>
          </div>
          <div className="feature-card">
            <h3 className="feature-title">Recomendaciones para gaming</h3>
            <p className="feature-description">
              Optimizaciones específicas para juegos como CS2: cómo conseguir más FPS estables,
              reducir stutters y mejorar la experiencia de juego.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ReportFeatures;
