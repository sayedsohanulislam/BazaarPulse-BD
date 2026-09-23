import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    brand: 'BazaarPulse BD',
    brand_sub: 'National Kitchen Market Fair Pricing & Anti-Gouging Intelligence',
    nav_home: 'Market Overview',
    nav_heatmap: 'Fair Price Grid',
    nav_tcb: 'TCB Trucks (OMS)',
    nav_supply: 'Supply Chain & Cold Storage',
    nav_fish_meat: 'Fish & Poultry',
    nav_agro: 'Agro-Weather & Forex',
    nav_whistle: 'Report Overpricing',
    nav_budget: 'Grocery Planner',
    nav_authority: 'DNCRP Magistrate Portal',
    btn_login: 'Login / Roles',
    btn_sync: 'Sync Telemetry'
  },
  bn: {
    brand: 'বাজারপালস বিডি',
    brand_sub: 'জাতীয় নিত্যপণ্য নায্যমূল্য ও ভোক্তা-অধিকার সুরক্ষা প্ল্যাটফর্ম',
    nav_home: 'বাজার চিত্র',
    nav_heatmap: 'ন্যায্যমূল্য গ্রিড',
    nav_tcb: 'টিসিবি ওএমএস ট্রাক',
    nav_supply: 'সাপ্লাই চেইন ও কোল্ড স্টোরেজ',
    nav_fish_meat: 'মাছ ও ব্রয়লার মুরগি',
    nav_agro: 'কৃষি আবহাওয়া ও ডলার রেট',
    nav_whistle: 'অতিরিক্ত দামের অভিযোগ',
    nav_budget: 'মাসিক বাজার বাজেট',
    nav_authority: 'ভোক্তা অধিকার ও ম্যাজিস্ট্রেট',
    btn_login: 'লগইন / ভূমিকা',
    btn_sync: 'লাইভ সিঙ্ক'
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem('bazaarpulse_lang') || 'bn');

  useEffect(() => {
    localStorage.setItem('bazaarpulse_lang', lang);
  }, [lang]);

  const toggleLanguage = () => {
    setLang(prev => (prev === 'en' ? 'bn' : 'en'));
  };

  const t = (key) => {
    return translations[lang]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
