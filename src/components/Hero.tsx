// src/components/Hero.tsx
import { useAppSettings } from '../context/AppSettingsContext';

function Hero() {
  const { language } = useAppSettings();
  const isEn = language === 'en';

  const handleBuyClick = () => {
    if (isEn) {
      alert('Later this will open Stripe Checkout.');
    } else {
      alert('Más adelante va Stripe Checkout');
    }
  };

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-left">
            <h1 className="hero-title">
              {isEn
                ? 'Scan your laptop and see what is slowing it down in minutes.'
                : 'Escaneá tu laptop e identificá qué la está frenando en minutos.'}
            </h1>
            <p className="hero-description">
              {isEn
                ? 'Laptelligence reads the real state of your laptop and generates a clear report: what is fine, what is wrong and what you can do today to improve performance, clean junk and prepare your machine to work or play.'
                : 'Laptelligence analiza el estado real de tu laptop y genera un reporte claro: qué está bien, qué está mal y qué podés hacer hoy para mejorar rendimiento, limpiar basura y preparar tu equipo para trabajar o jugar.'}
            </p>
            <div className="hero-cta">
              <button onClick={handleBuyClick} className="btn-primary">
                {isEn
                  ? 'Buy Scan + Smart Report'
                  : 'Comprar Scan + Reporte Inteligente'}
              </button>
              <p className="price-text">
                {isEn
                  ? 'Launch price: USD 9.99 · one-time payment'
                  : 'Lanzamiento: USD 9.99 · pago único'}
              </p>
            </div>
            <p className="hero-note">
              {isEn
                ? 'No subscription, no weird promises. Just an honest diagnosis and concrete recommendations.'
                : 'Sin suscripción, sin promesas raras. Solo un diagnóstico honesto y recomendaciones concretas.'}
            </p>
          </div>

          <div className="hero-right">
            <div className="dashboard-card">
              <h3 className="dashboard-title">
                {isEn ? 'Example result' : 'Ejemplo de resultado'}
              </h3>
              <div className="dashboard-metrics">
                <div className="metric">
                  <span className="metric-label">
                    {isEn ? 'RAM usage' : 'Uso de RAM'}
                  </span>
                  <span className="metric-value">
                    <span className="status-badge status-high">
                      {isEn ? 'High' : 'Alto'}
                    </span>{' '}
                    86%
                  </span>
                </div>
                <div className="metric">
                  <span className="metric-label">
                    {isEn ? 'Background programs' : 'Programas en segundo plano'}
                  </span>
                  <span className="metric-value">
                    <span className="status-badge status-warning">
                      {isEn ? '11 critical processes' : '11 procesos críticos'}
                    </span>
                  </span>
                </div>
                <div className="metric">
                  <span className="metric-label">
                    {isEn ? 'Disk space' : 'Espacio en disco'}
                  </span>
                  <span className="metric-value">120 GB libres</span>
                </div>
                <div className="metric">
                  <span className="metric-label">
                    {isEn ? 'Average temperature' : 'Temperatura promedio'}
                  </span>
                  <span className="metric-value">
                    <span className="status-badge status-high">
                      {isEn ? 'High' : 'Alta'}
                    </span>{' '}
                    92 ºC
                  </span>
                </div>
                <div className="metric">
                  <span className="metric-label">
                    {isEn ? 'Gaming mode' : 'Modo gaming'}
                  </span>
                  <span className="metric-value">
                    <span className="status-badge status-warning">
                      {isEn ? 'Not optimized' : 'No optimizada'}
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
