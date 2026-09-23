import React, { createContext, useContext, useState, useEffect } from 'react';
import { commodityApi } from '../services/api';

const BazaarContext = createContext();

export const BazaarProvider = ({ children }) => {
  const [ticker, setTicker] = useState(null);
  const [commodities, setCommodities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchTickerAndCommodities = async () => {
    try {
      const [tickerRes, commRes] = await Promise.all([
        commodityApi.getLiveTicker(),
        commodityApi.getAll()
      ]);
      if (tickerRes.data.success) setTicker(tickerRes.data.data);
      if (commRes.data.success) setCommodities(commRes.data.data);
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
    } catch (err) {
      console.error('Force sync error:', err);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTickerAndCommodities();
    // Auto polling every 60 seconds
    const interval = setInterval(fetchTickerAndCommodities, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <BazaarContext.Provider value={{ ticker, commodities, loading, isRefreshing, forceRefresh, fetchTickerAndCommodities }}>
      {children}
    </BazaarContext.Provider>
  );
};

export const useBazaar = () => useContext(BazaarContext);
