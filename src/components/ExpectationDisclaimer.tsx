function ExpectationDisclaimer() {
  return (
    <section className="section section-alt">
      <div className="container">
        <div className="disclaimer-grid">
          <div className="disclaimer-column">
            <h3 className="disclaimer-title">Lo que sí prometemos</h3>
            <ul className="disclaimer-list">
              <li>Análisis real basado en datos de tu equipo</li>
              <li>Explicaciones claras en lenguaje simple</li>
              <li>Recomendaciones aplicables que podés seguir</li>
              <li>Honestidad sobre qué se puede y qué no se puede mejorar</li>
              <li>Sin acceso a tus archivos personales</li>
            </ul>
          </div>
          <div className="disclaimer-column">
            <h3 className="disclaimer-title">Lo que no prometemos</h3>
            <ul className="disclaimer-list">
              <li>No garantizamos FPS exactos ni resultados específicos</li>
              <li>No tocamos tus archivos personales ni configuraciones críticas</li>
              <li>No es soporte técnico 24/7 ni consultas ilimitadas</li>
              <li>No reparamos problemas de hardware físico</li>
              <li>No somos magia: si tu laptop es muy vieja, hay límites</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExpectationDisclaimer;
