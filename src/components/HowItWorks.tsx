function HowItWorks() {
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
