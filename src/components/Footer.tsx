// src/components/Footer.tsx
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <p className="footer-text">Laptelligence © {currentYear}</p>
        <p className="footer-disclaimer">
          Herramienta de diagnóstico y reporte. No reemplaza servicio técnico tradicional, lo complementa.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
