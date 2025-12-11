import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import ReportFeatures from './components/ReportFeatures';
import Pricing from './components/Pricing';
import ExpectationDisclaimer from './components/ExpectationDisclaimer';
import Footer from './components/Footer';
import { ScanUploadSection } from "./components/ScanUploadSection";

import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <HowItWorks />
      <ScanUploadSection />
      <ReportFeatures />
      <Pricing />
      <ExpectationDisclaimer />
      <Footer />
    </div>
  );
}

export default App;
