import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import ReportFeatures from './components/ReportFeatures';
import Pricing from './components/Pricing';
import ExpectationDisclaimer from './components/ExpectationDisclaimer';
import Footer from './components/Footer';

import ScanUpload from "./components/ScanUpload";


import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <HowItWorks />
       <ScanUpload />
      <ReportFeatures />
      <Pricing />
      <ExpectationDisclaimer />
      <Footer />
    </div>
  );
}

export default App;
