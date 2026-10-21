import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { BazaarProvider } from './context/BazaarContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PanicAlertBanner from './components/PanicAlertBanner';
import AuthModal from './components/AuthModal';
import ToastContainer from './components/ToastContainer';
import BasketDrawer from './components/BasketDrawer';
import CommandPalette from './components/CommandPalette';
import MobileBottomNav from './components/MobileBottomNav';

import Home from './pages/Home';
import PriceHeatmap from './pages/PriceHeatmap';
import TcbTruckLocator from './pages/TcbTruckLocator';
import SupplyChainRadar from './pages/SupplyChainRadar';
import FishMeatMarket from './pages/FishMeatMarket';
import AgroWeatherForex from './pages/AgroWeatherForex';
import ConsumerWhistleblower from './pages/ConsumerWhistleblower';
import BudgetCalculator from './pages/BudgetCalculator';
import AuthorityCommand from './pages/AuthorityCommand';
import NotFound from './pages/NotFound';

function MainApp() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#0b1120] text-slate-100 font-sans antialiased selection:bg-emerald-500 selection:text-white pb-16 md:pb-0">
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      <MobileBottomNav />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
      <BasketDrawer />
      <CommandPalette />
      <ToastContainer />
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
