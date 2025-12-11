// src/components/Navbar.tsx
import { useAppSettings } from '../context/AppSettingsContext';

function Navbar() {
  const { theme, language, setLanguage, toggleTheme } = useAppSettings();
  const isEn = language === 'en';

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
            <p className="logo-subtitle">
              {isEn ? 'Laptop intelligence for humans' : 'Laptop intelligence for humans'}
            </p>
          </div>

          <div className="nav-group">
            <div className="nav-links">
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="nav-link"
              >
                {isEn ? 'How it works' : 'Cómo funciona'}
              </button>
              <button
                onClick={() => scrollToSection('report-features')}
                className="nav-link"
              >
                {isEn ? 'What you get' : 'Qué incluye'}
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="nav-link"
              >
                {isEn ? 'Pricing' : 'Precios'}
              </button>
            </div>

            <div className="nav-actions">
              <div className="toggle-pill">
                <button
                  type="button"
                  onClick={() => setLanguage('es')}
                  className={language === 'es' ? 'is-active' : ''}
                >
                  ES
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={language === 'en' ? 'is-active' : ''}
                >
                  EN
                </button>
              </div>

              <button
                type="button"
                className="theme-toggle-btn"
                onClick={toggleTheme}
                aria-label={
                  theme === 'dark'
                    ? 'Cambiar a tema claro'
                    : 'Cambiar a tema oscuro'
                }
              >
                {theme === 'dark' ? '☾' : '☀︎'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
