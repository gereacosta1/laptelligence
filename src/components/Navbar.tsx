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
          <div className="logo-section">
            <h1 className="logo">LAPTELLIGENCE</h1>
            <p className="logo-subtitle">Laptop intelligence for humans</p>
          </div>
          <div className="nav-links">
            <button onClick={() => scrollToSection('how-it-works')} className="nav-link">
              Cómo funciona
            </button>
            <button onClick={() => scrollToSection('report-features')} className="nav-link">
              Qué incluye
            </button>
            <button onClick={() => scrollToSection('pricing')} className="nav-link">
              Precios
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
