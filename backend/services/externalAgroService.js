const axios = require('axios');

class ExternalAgroService {
  constructor() {
    this.cachedForex = {
      usdToBdt: 121.50,
      lastUpdated: new Date().toISOString()
    };
    this.cachedAgroWeather = {
      boguraRainMm: 0,
      jashoreTempC: 31,
      supplyDisruptionRisk: 'LOW',
      harvestStatus: 'Normal Field Operations'
    };
  }

  // 1. Fetch Real-time USD/BDT Exchange Rate for Imported Essential Goods
  async fetchLiveForex() {
    try {
      const response = await axios.get('https://open.er-api.com/v6/latest/USD', { timeout: 6000 });
      if (response.data && response.data.rates && response.data.rates.BDT) {
        const rate = response.data.rates.BDT;
        this.cachedForex = {
          usdToBdt: Number(rate.toFixed(2)),
          lastUpdated: new Date().toISOString(),
          source: 'Open Exchange Rates Telemetry'
        };
        return this.cachedForex;
      }
    } catch (err) {
      console.warn(`[ForexSync] Live forex fetch error (${err.message}). Using resilient baseline 121.50 BDT/USD.`);
    }
    return this.cachedForex;
  }

  // 2. Fetch Real-time Agrometeorological Weather in Key Agricultural Belts (Bogura/Jashore)
  async fetchAgroWeather() {
    try {
      // Bogura coordinates: Lat 24.8465, Long 89.3778
      const url = 'https://api.open-meteo.com/v1/forecast?latitude=24.8465&longitude=89.3778&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m';
      const response = await axios.get(url, { timeout: 7000 });
      
      if (response.data && response.data.current) {
        const cur = response.data.current;
        const precip = cur.precipitation || 0;
        let risk = 'LOW';
        let status = 'Favorable Harvest & Transport Conditions';

        if (precip > 25) {
          risk = 'HIGH';
          status = 'Excessive Rainfall: Submerged Vegetable Plots & Logistics Delays';
        } else if (precip > 5) {
          risk = 'MODERATE';
          status = 'Damp Farmland: Muddy Road Slowdowns';
        }

        this.cachedAgroWeather = {
          boguraTempC: cur.temperature_2m,
          humidityPct: cur.relative_humidity_2m,
          precipMm: precip,
          windKmh: cur.wind_speed_10m,
          supplyDisruptionRisk: risk,
          harvestStatus: status,
          lastUpdated: new Date().toISOString(),
          source: 'Open-Meteo Agrometeorology Satellite Feed'
        };
        return this.cachedAgroWeather;
      }
    } catch (err) {
      console.warn(`[AgroWeatherSync] Weather fetch error (${err.message}). Using resilient baseline.`);
    }
    return this.cachedAgroWeather;
  }

  getCombinedAgroTelemetry() {
    // Calculate import landed costs based on live USD/BDT
    const rate = this.cachedForex.usdToBdt;
    // World market spot estimates: Crude Degummed Soya ~$950/MT, Lentils ~$650/MT, Raw Sugar ~$440/MT
    const soybeanImportLandedPerLiter = Math.round((950 * rate / 1000) * 1.15); // +15% refining & tariff
    const lentilImportLandedPerKg = Math.round((650 * rate / 1000) * 1.12);
    const sugarImportLandedPerKg = Math.round((440 * rate / 1000) * 1.25);

    return {
      forex: this.cachedForex,
      agroWeather: this.cachedAgroWeather,
      importParityBenchmarks: {
        soybeanOilLandedBdt: soybeanImportLandedPerLiter,
        lentilsLandedBdt: lentilImportLandedPerKg,
        sugarLandedBdt: sugarImportLandedPerKg,
        tariffAssumption: 'NBR Duty Concession 2024 Applied'
      },
      syncedAt: new Date().toISOString()
    };
  }
}

module.exports = new ExternalAgroService();
