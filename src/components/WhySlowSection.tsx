// src/components/WhySlowSection.tsx
function WhySlowSection() {
  return (
    <section id="why-slow" className="section section-alt">
      <div className="container">
        <h2 className="section-title">Por qué tu laptop se siente lenta</h2>
        <p className="section-subtitle">
          Aunque tengas buena máquina, Windows se va llenando de procesos, programas y basura
          que terminan frenando todo.
        </p>

        <div className="features-grid">
          <div className="feature-card">
            <h3 className="feature-title">Programas en segundo plano</h3>
            <p className="feature-description">
              Discord, navegadores, launchers y apps que se abren con Windows y consumen RAM y CPU
              sin que te des cuenta.
            </p>
          </div>

          <div className="feature-card">
            <h3 className="feature-title">RAM casi al límite</h3>
            <p className="feature-description">
              Cuando la RAM está muy alta, todo se vuelve lento: juegos, Chrome, programas de trabajo.
              El reporte te muestra cuánto estás usando realmente.
            </p>
          </div>

          <div className="feature-card">
            <h3 className="feature-title">Disco lleno o desordenado</h3>
            <p className="feature-description">
              Poco espacio libre hace que Windows y los juegos tarden más en abrirse y carguen peor.
              Laptelligence te dice si estás en zona roja.
            </p>
          </div>

          <div className="feature-card">
            <h3 className="feature-title">Configuración no optimizada</h3>
            <p className="feature-description">
              Modo gaming mal configurado, energía en modo “ahorro”, opciones de rendimiento que vienen
              por defecto y nadie toca. El reporte te da un plan para ajustarlas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhySlowSection;
