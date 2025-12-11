// src/components/Navbar.tsx
import logoIcon from '/laptelligence-icon.svg';

function Navbar() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          {/* Logo + nombre de la marca */}
          <div className="logo-section">
            <div className="logo-brand">
              <img
                src={logoIcon}
                alt="Laptelligence logo"
                className="logo-icon"
              />
              <div className="logo-text">
                <h1 className="logo">LAPTELLIGENCE</h1>
                <p className="logo-subtitle">Laptop intelligence for humans</p>
              </div>
            </div>
          </div>

          {/* Links de navegación */}
          <div className="nav-links">
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="nav-link"
            >
              Cómo funciona
            </button>
            <button
              onClick={() => scrollToSection('report-features')}
              className="nav-link"
            >
              Qué incluye
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="nav-link"
            >
              Precios
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
