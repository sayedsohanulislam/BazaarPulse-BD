import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    brand: 'BazaarPulse BD',
    brand_sub: 'National Kitchen Market Fair Pricing & Anti-Gouging Intelligence',
    nav_home: 'Market Overview',
    nav_heatmap: 'Fair Price Grid',
    nav_tcb: 'TCB Trucks (OMS)',
    nav_supply: 'Supply Chain & Storage',
    nav_fish_meat: 'Fish & Poultry',
    nav_agro: 'Agro-Weather & Forex',
    nav_whistle: 'Report Overpricing',
    nav_budget: 'Grocery Planner',
    nav_authority: 'DNCRP Magistrate Portal',
    btn_login: 'Login / Roles',
    btn_sync: 'Sync Telemetry',
    basket_title: 'Citizen Fair Price Basket',
    basket_empty: 'Your grocery basket is empty',
    basket_add: 'Add to Fair Basket',
    basket_added: 'Added to basket',
    compare_prices: '3-Way Price Comparator',
    dam_fair: 'DAM Fair Cap',
    karwan_wholesale: 'Karwan Bazar Wholesale',
    retail_actual: 'Neighborhood Retail',
    net_overcharge: 'Citizen Overcharge Gap',
    net_savings: 'Savings vs Retail Market',
    print_receipt: 'Print Official Price Receipt',
    search_command: 'Search commodities, markets, hotlines (Ctrl+K)...',
    diagnostic_wizard: 'Formalin & Safety Diagnostic',
    closest_truck: 'Locate Nearest TCB Truck',
    view_card: 'Card View',
    view_table: 'Financial Matrix View',
    sort_overcharge: 'Highest Overcharge',
    sort_price_desc: 'Price: High to Low',
    sort_price_asc: 'Price: Low to High',
    sort_risk: 'Syndicate Risk'
  }
};

export const LanguageProvider = ({ children }) => {
  const lang = 'en';

  const toggleLanguage = () => {};

  const t = (key) => {
    return translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: () => {}, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
