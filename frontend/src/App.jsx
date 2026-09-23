import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { BazaarProvider } from './context/BazaarContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PanicAlertBanner from './components/PanicAlertBanner';
import AuthModal from './components/AuthModal';

import Home from './pages/Home';
import PriceHeatmap from './pages/PriceHeatmap';
import TcbTruckLocator from './pages/TcbTruckLocator';
import SupplyChainRadar from './pages/SupplyChainRadar';
import FishMeatMarket from './pages/FishMeatMarket';
import AgroWeatherForex from './pages/AgroWeatherForex';
import ConsumerWhistleblower from './pages/ConsumerWhistleblower';
import BudgetCalculator from './pages/BudgetCalculator';
import AuthorityCommand from './pages/AuthorityCommand';

function MainApp() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-white">
      <Navbar onOpenAuth={() => setAuthOpen(true)} />
      <PanicAlertBanner />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home onOpenAuth={() => setAuthOpen(true)} />} />
          <Route path="/heatmap" element={<PriceHeatmap />} />
          <Route path="/tcb" element={<TcbTruckLocator />} />
          <Route path="/supply" element={<SupplyChainRadar />} />
          <Route path="/fish-meat" element={<FishMeatMarket />} />
          <Route path="/agro" element={<AgroWeatherForex />} />
          <Route path="/whistle" element={<ConsumerWhistleblower />} />
          <Route path="/budget" element={<BudgetCalculator />} />
          <Route path="/authority" element={<AuthorityCommand />} />
        </Routes>
      </main>

      <Footer />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <LanguageProvider>
        <AuthProvider>
          <BazaarProvider>
            <MainApp />
          </BazaarProvider>
        </AuthProvider>
      </LanguageProvider>
    </Router>
  );
}
