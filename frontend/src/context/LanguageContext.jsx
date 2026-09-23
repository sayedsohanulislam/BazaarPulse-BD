import React, { createContext, useContext, useState, useEffect } from 'react';

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
    btn_sync: 'লাইভ সিঙ্ক',
    basket_title: 'নাগরিক ন্যায্যমূল্য বাজার ব্যাগ',
    basket_empty: 'আপনার বাজার ব্যাগে কোন পণ্য নেই',
    basket_add: 'ব্যাগে যোগ করুন',
    basket_added: 'ব্যাগে যোগ করা হয়েছে',
    compare_prices: '৩-মুখী বাজারদর তুলনা',
    dam_fair: 'সরকারি ন্যায্যমূল্য (DAM)',
    karwan_wholesale: 'কাওরান বাজার পাইকারি',
    retail_actual: 'মহল্লার খুচরা বাজার',
    net_overcharge: 'অতিরিক্ত নেওয়া মোট অর্থ',
    net_savings: 'ন্যায্যমূল্যে আপনার সাশ্রয়',
    print_receipt: 'মূল্য যাচাই রসিদ প্রিন্ট করুন',
    search_command: 'পণ্য, বাজার বা হেল্পলাইন খুঁজুন (Ctrl+K)...',
    diagnostic_wizard: 'ফরমালিন ও খাদ্য নিরাপত্তা যাচাই',
    closest_truck: 'নিকটস্থ টিসিবি ট্রাক খুঁজুন',
    view_card: 'কার্ড ভিউ',
    view_table: 'আর্থিক মেট্রিক্স টেবিল',
    sort_overcharge: 'সর্বোচ্চ অতিরিক্ত দাম',
    sort_price_desc: 'দাম: বেশি থেকে কম',
    sort_price_asc: 'দাম: কম থেকে বেশি',
    sort_risk: 'সিন্ডিকেট ঝুঁকি'
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
