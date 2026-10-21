const externalAgroService = require('../services/externalAgroService');
const mockDataService = require('../services/mockDataService');

exports.getAgroForex = async (req, res) => {
  try {
    const data = externalAgroService.getCombinedAgroTelemetry();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getMarketSpread = async (req, res) => {
  try {
    // Inter-market spread analysis comparing Karwan Bazar Wholesale Arat with 5 retail centers
    const spreads = [
      {
        marketName: 'Karwan Bazar Arat (Wholesale Benchmark)',
        marketNameBn: 'Karwan Bazar Wholesale Arat',
        district: 'Dhaka',
        type: 'WHOLESALE_ARAT',
        onionPrice: 80,
        potatoPrice: 42,
        broilerPrice: 168,
        eggHali: 46,
        chiliPrice: 130
      },
      {
        marketName: 'Dhanmondi Kachabazar',
        marketNameBn: 'Dhanmondi Kachabazar',
        district: 'Dhaka',
        type: 'RETAIL',
        onionPrice: 110,
        potatoPrice: 60,
        broilerPrice: 200,
        eggHali: 58,
        chiliPrice: 240,
        spreadVsKarwanBazarPct: 32.4
      },
      {
        marketName: 'Mirpur-1 Kitchen Market',
        marketNameBn: 'Mirpur-1 Kitchen Market',
        district: 'Dhaka',
        type: 'RETAIL',
        onionPrice: 105,
        potatoPrice: 58,
        broilerPrice: 195,
        eggHali: 55,
        chiliPrice: 220,
        spreadVsKarwanBazarPct: 26.8
      },
      {
        marketName: 'Uttara Sector-7 Bazar',
        marketNameBn: 'Uttara Sector-7 Bazar',
        district: 'Dhaka',
        type: 'RETAIL',
        onionPrice: 115,
        potatoPrice: 62,
        broilerPrice: 205,
        eggHali: 58,
        chiliPrice: 250,
        spreadVsKarwanBazarPct: 36.1
      },
      {
        marketName: 'Chattogram Reazuddin Bazar',
        marketNameBn: 'Chattogram Reazuddin Bazar',
        district: 'Chattogram',
        type: 'REGIONAL_HUB',
        onionPrice: 102,
        potatoPrice: 56,
        broilerPrice: 190,
        eggHali: 54,
        chiliPrice: 210,
        spreadVsKarwanBazarPct: 22.5
      }
    ];

    res.json({ success: true, data: spreads });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.calcBudget = async (req, res) => {
  try {
    const { familySize = 4, lifestyleTier = 'STANDARD' } = req.body;
    const factor = Math.max(1, Number(familySize) / 4);

    // Baseline monthly quantities for a 4-person family in Bangladesh
    const baseQuantities = {
      riceKg: 25,
      potatoKg: 12,
      onionKg: 6,
      soybeanOilLiters: 5,
      lentilsKg: 4,
      broilerChickenKg: 6,
      beefKg: 2,
      eggsHali: 8,
      vegetablesKg: 15,
      spicesKg: 2,
      sugarKg: 3
    };

    // Current indicative fair retail prices (BDT)
    const fairPrices = {
      rice: 72,
      potato: 50,
      onion: 90,
      oil: 167,
      lentils: 135,
      chicken: 185,
      beef: 750,
      eggs: 52,
      vegetables: 55,
      spices: 350,
      sugar: 128
    };

    // Current inflated neighborhood retail prices
    const marketPrices = {
      rice: 80,
      potato: 60,
      onion: 105,
      oil: 172,
      lentils: 145,
      chicken: 200,
      beef: 780,
      eggs: 58,
      vegetables: 75,
      spices: 420,
      sugar: 135
    };

    const calculateCost = (prices) => {
      return Math.round((
        (baseQuantities.riceKg * prices.rice) +
        (baseQuantities.potatoKg * prices.potato) +
        (baseQuantities.onionKg * prices.onion) +
        (baseQuantities.soybeanOilLiters * prices.oil) +
        (baseQuantities.lentilsKg * prices.lentils) +
        (baseQuantities.broilerChickenKg * prices.chicken) +
        (baseQuantities.beefKg * prices.beef) +
        (baseQuantities.eggsHali * prices.eggs) +
        (baseQuantities.vegetablesKg * prices.vegetables) +
        (baseQuantities.spicesKg * prices.spices) +
        (baseQuantities.sugarKg * prices.sugar)
      ) * factor);
    };

    const fairMonthlyTotal = calculateCost(fairPrices);
    const marketMonthlyTotal = calculateCost(marketPrices);
    const monthlySavingAtFairPrices = marketMonthlyTotal - fairMonthlyTotal;

    res.json({
      success: true,
      data: {
        familySize,
        lifestyleTier,
        fairMonthlyTotal,
        marketMonthlyTotal,
        monthlySavingAtFairPrices,
        inflationOverFairPct: Number(((monthlySavingAtFairPrices / fairMonthlyTotal) * 100).toFixed(1)),
        itemized: baseQuantities
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.calcIftarBasket = async (req, res) => {
  try {
    // Ramadan Essentials Bundle (30 Days)
    const bundle = [
      { item: 'Chickpeas', qty: '5 kg', fairRate: 95, marketRate: 115 },
      { item: 'Dates (Regular)', qty: '2 kg', fairRate: 280, marketRate: 380 },
      { item: 'Gram Flour (Besan)', qty: '4 kg', fairRate: 110, marketRate: 135 },
      { item: 'Soybean Oil', qty: '5 L', fairRate: 167, marketRate: 175 },
      { item: 'Refined Sugar', qty: '4 kg', fairRate: 128, marketRate: 135 },
      { item: 'Onion', qty: '8 kg', fairRate: 88, marketRate: 110 }
    ];

    let fairSum = 0;
    let marketSum = 0;

    const itemized = bundle.map(b => {
      const numericQty = parseFloat(b.qty);
      const fairCost = Math.round(numericQty * b.fairRate);
      const marketCost = Math.round(numericQty * b.marketRate);
      fairSum += fairCost;
      marketSum += marketCost;
      return {
        ...b,
        fairCost,
        marketCost,
        saving: marketCost - fairCost
      };
    });

    res.json({
      success: true,
      data: {
        bundleName: 'Ramadan Family Iftar Essentials',
        totalFairCost: fairSum,
        totalMarketCost: marketSum,
        totalSavings: marketSum - fairSum,
        savingsPercent: Number((((marketSum - fairSum) / fairSum) * 100).toFixed(1)),
        items: itemized
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
