import React, { createContext, useContext, useState, useEffect } from 'react';
import { commodityApi } from '../services/api';

const BazaarContext = createContext();

export const BazaarProvider = ({ children }) => {
  const [ticker, setTicker] = useState(null);
  const [commodities, setCommodities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Basket State (Persisted in localStorage)
  const [basket, setBasket] = useState(() => {
    try {
      const saved = localStorage.getItem('bazaarpulse_basket');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isBasketOpen, setIsBasketOpen] = useState(false);

  // Command Palette State
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Toast Notification Stack
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Keyboard shortcut listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Save basket changes
  useEffect(() => {
    try {
      localStorage.setItem('bazaarpulse_basket', JSON.stringify(basket));
    } catch (e) {
      console.error('Error saving basket:', e);
    }
  }, [basket]);

  const addToBasket = (commodity, qty = 1) => {
    setBasket(prev => {
      const existing = prev.find(item => (item.commodity.id || item.commodity._id) === (commodity.id || commodity._id));
      if (existing) {
        return prev.map(item => 
          (item.commodity.id || item.commodity._id) === (commodity.id || commodity._id)
            ? { ...item, qty: item.qty + qty }
            : item
        );
      }
      return [...prev, { commodity, qty }];
    });
    addToast(`${commodity.nameBn || commodity.name} added to Fair Basket!`, 'success');
  };

  const removeFromBasket = (commodityId) => {
    setBasket(prev => prev.filter(item => (item.commodity.id || item.commodity._id) !== commodityId));
  };

  const updateBasketQty = (commodityId, qty) => {
    if (qty <= 0) {
      removeFromBasket(commodityId);
      return;
    }
    setBasket(prev => prev.map(item => 
      (item.commodity.id || item.commodity._id) === commodityId
        ? { ...item, qty }
        : item
    ));
  };

  const clearBasket = () => {
    setBasket([]);
  };

  const getBasketTotals = () => {
    return basket.reduce((acc, item) => {
      const c = item.commodity;
      const q = item.qty || 1;
      const fair = (c.damFairPriceMax || c.damFairPriceMin || 0) * q;
      const wholesale = (c.karwanBazarWholesale || 0) * q;
      const retail = (c.retailAvgPrice || 0) * q;

      acc.fairTotal += fair;
      acc.wholesaleTotal += wholesale;
      acc.retailTotal += retail;
      acc.itemCount += q;
      return acc;
    }, { fairTotal: 0, wholesaleTotal: 0, retailTotal: 0, itemCount: 0 });
  };

  const fetchTickerAndCommodities = async () => {
    try {
      const [tickerRes, commRes] = await Promise.all([
        commodityApi.getLiveTicker(),
        commodityApi.getAll()
      ]);
      if (tickerRes.data?.success) setTicker(tickerRes.data.data);
      if (commRes.data?.success) setCommodities(commRes.data.data);
    } catch (err) {
      console.error('Error fetching market telemetry:', err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const forceRefresh = async () => {
    setIsRefreshing(true);
    try {
      await commodityApi.forceSync();
      await fetchTickerAndCommodities();
      addToast('Real-time agricultural & forex telemetry synchronized!', 'success');
    } catch (err) {
      console.error('Force sync error:', err);
      addToast('Telemetry sync encountered an error', 'error');
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTickerAndCommodities();
    const interval = setInterval(fetchTickerAndCommodities, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <BazaarContext.Provider value={{
      ticker,
      commodities,
      loading,
      isRefreshing,
      forceRefresh,
      fetchTickerAndCommodities,
      basket,
      isBasketOpen,
      setIsBasketOpen,
      addToBasket,
      removeFromBasket,
      updateBasketQty,
      clearBasket,
      getBasketTotals,
      toasts,
      addToast,
      removeToast,
      isCommandPaletteOpen,
      setIsCommandPaletteOpen
    }}>
      {children}
    </BazaarContext.Provider>
  );
};

export const useBazaar = () => useContext(BazaarContext);
