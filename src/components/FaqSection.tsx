// src/components/FaqSection.tsx
function FaqSection() {
  return (
    <section id="faq" className="section section-alt">
      <div className="container">
        <h2 className="section-title">Preguntas frecuentes</h2>
        <p className="section-subtitle">
          Un resumen rápido de las dudas más comunes antes de comprar el análisis.
        </p>

        <div className="features-grid">
          <div className="feature-card">
            <h3 className="feature-title">¿Es seguro ejecutar el asistente?</h3>
            <p className="feature-description">
              Sí. El script solo lee métricas básicas de tu sistema (RAM, procesos, disco, versión de
              Windows) y genera un archivo <code>laptelligence_scan.json</code>. No modifica nada en tu laptop.
            </p>
          </div>

          <div className="feature-card">
            <h3 className="feature-title">¿Accede a mis archivos personales?</h3>
            <p className="feature-description">
              No. El asistente no abre ni lee documentos, fotos ni contraseñas.
              Solo mira números de rendimiento y espacio, como los que verías en el Administrador de tareas.
            </p>
          </div>

          <div className="feature-card">
            <h3 className="feature-title">¿En qué laptops funciona?</h3>
            <p className="feature-description">
              Está pensado para laptops con Windows 10 u 11. Si tenés dudas sobre tu equipo,
              me podés escribir antes de comprar.
            </p>
          </div>

          <div className="feature-card">
            <h3 className="feature-title">¿Puedo usarlo más de una vez?</h3>
            <p className="feature-description">
              Sí. Podés generar nuevos scans cuando hagas cambios grandes
              (por ejemplo, después de limpiar programas o de cambiar de disco)
              para comparar cómo mejoró tu equipo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FaqSection;
