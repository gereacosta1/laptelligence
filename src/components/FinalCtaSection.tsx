// src/components/FinalCtaSection.tsx
function FinalCtaSection() {
  const handleBuyClick = () => {
    // Placeholder: más adelante acá conectamos Stripe Checkout
    alert('Más adelante acá va a ir el pago con Stripe. Por ahora es solo una vista previa.');
  };

  return (
    <section className="section">
      <div className="container">
        <div className="scan-upload-card">
          <h2 className="section-title">¿Listo para entender qué frena tu laptop?</h2>
          <p className="section-subtitle">
            En menos de una hora vas a tener un reporte claro con problemas detectados
            y un plan de acción que podés seguir paso a paso, incluso si no sos técnico.
          </p>

          <button className="btn-primary" onClick={handleBuyClick}>
            Comprar Scan + Reporte Inteligente
          </button>

          <p className="hero-note">
            Pago único. Sin suscripción, sin letra chica. Más adelante, este botón te va a llevar
            al pago con Stripe y después del pago vas a recibir el enlace para descargar el asistente.
          </p>
        </div>
      </div>
    </section>
  );
}

export default FinalCtaSection;
