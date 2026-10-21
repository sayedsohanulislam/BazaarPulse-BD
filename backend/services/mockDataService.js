class MockDataService {
  constructor() {
    this.commodities = [
      {
        id: 'c1',
        name: 'Local Onion',
        nameBn: 'Local Onion (Faridpur)',
        category: 'Spices',
        unit: 'kg',
        damFairPriceMin: 85,
        damFairPriceMax: 95,
        karwanBazarWholesale: 80,
        retailAvgPrice: 105,
        yesterdayPrice: 95,
        deltaPercent: 10.5,
        volatilityIndex: 'SURGING',
        syndicateRiskScore: 78,
        supplyOrigin: 'Faridpur / Pabna'
      },
      {
        id: 'c2',
        name: 'Imported Onion',
        nameBn: 'Indian / Egyptian Onion',
        category: 'Spices',
        unit: 'kg',
        damFairPriceMin: 70,
        damFairPriceMax: 80,
        karwanBazarWholesale: 68,
        retailAvgPrice: 85,
        yesterdayPrice: 85,
        deltaPercent: 0.0,
        volatilityIndex: 'STABLE',
        syndicateRiskScore: 35,
        supplyOrigin: 'India (Benapole Port)'
      },
      {
        id: 'c3',
        name: 'Granola Potato',
        nameBn: 'Holland Diamond Potato (Munshiganj)',
        category: 'Vegetables',
        unit: 'kg',
        damFairPriceMin: 45,
        damFairPriceMax: 50,
        karwanBazarWholesale: 42,
        retailAvgPrice: 58,
        yesterdayPrice: 55,
        deltaPercent: 5.4,
        volatilityIndex: 'MODERATE',
        syndicateRiskScore: 82,
        supplyOrigin: 'Munshiganj Cold Storage'
      },
      {
        id: 'c4',
        name: 'Green Chili',
        nameBn: 'Hot Green Chili',
        category: 'Vegetables',
        unit: 'kg',
        damFairPriceMin: 140,
        damFairPriceMax: 180,
        karwanBazarWholesale: 130,
        retailAvgPrice: 220,
        yesterdayPrice: 260,
        deltaPercent: -15.3,
        volatilityIndex: 'CRISIS',
        syndicateRiskScore: 65,
        supplyOrigin: 'Bogura / Jashore'
      },
      {
        id: 'c5',
        name: 'Soybean Oil (1L Bottled)',
        nameBn: 'Bottled Soybean Oil (1 Liter)',
        category: 'Oils & Fats',
        unit: 'liter',
        damFairPriceMin: 165,
        damFairPriceMax: 167,
        karwanBazarWholesale: 160,
        retailAvgPrice: 167,
        yesterdayPrice: 167,
        deltaPercent: 0.0,
        volatilityIndex: 'STABLE',
        syndicateRiskScore: 40,
        supplyOrigin: 'NBR Government Mandated Cap'
      },
      {
        id: 'c6',
        name: 'Palm Oil Loose',
        nameBn: 'Super Palm Oil Loose',
        category: 'Oils & Fats',
        unit: 'liter',
        damFairPriceMin: 140,
        damFairPriceMax: 145,
        karwanBazarWholesale: 138,
        retailAvgPrice: 148,
        yesterdayPrice: 145,
        deltaPercent: 2.1,
        volatilityIndex: 'STABLE',
        syndicateRiskScore: 30,
        supplyOrigin: 'Khatunganj Importers'
      },
      {
        id: 'c7',
        name: 'Broiler Chicken',
        nameBn: 'Broiler Chicken (Live)',
        category: 'Poultry & Meat',
        unit: 'kg',
        damFairPriceMin: 175,
        damFairPriceMax: 185,
        karwanBazarWholesale: 168,
        retailAvgPrice: 195,
        yesterdayPrice: 190,
        deltaPercent: 2.6,
        volatilityIndex: 'MODERATE',
        syndicateRiskScore: 72,
        supplyOrigin: 'Gazipur & Tangail Farms'
      },
      {
        id: 'c8',
        name: 'Sonali Chicken',
        nameBn: 'Sonali Chicken',
        category: 'Poultry & Meat',
        unit: 'kg',
        damFairPriceMin: 280,
        damFairPriceMax: 300,
        karwanBazarWholesale: 265,
        retailAvgPrice: 320,
        yesterdayPrice: 310,
        deltaPercent: 3.2,
        volatilityIndex: 'MODERATE',
        syndicateRiskScore: 45,
        supplyOrigin: 'Mymensingh Feed Mills'
      },
      {
        id: 'c9',
        name: 'Farm Brown Eggs (4 Pcs)',
        nameBn: 'Farm Red Eggs (4 Pcs)',
        category: 'Poultry & Meat',
        unit: 'hali',
        damFairPriceMin: 48,
        damFairPriceMax: 52,
        karwanBazarWholesale: 46,
        retailAvgPrice: 56,
        yesterdayPrice: 55,
        deltaPercent: 1.8,
        volatilityIndex: 'STABLE',
        syndicateRiskScore: 88,
        supplyOrigin: 'Tejgaon Egg Arat Auction'
      },
      {
        id: 'c10',
        name: 'Miniket Rice',
        nameBn: 'Miniket Rice (50kg sack)',
        category: 'Grains & Rice',
        unit: 'kg',
        damFairPriceMin: 68,
        damFairPriceMax: 72,
        karwanBazarWholesale: 66,
        retailAvgPrice: 76,
        yesterdayPrice: 75,
        deltaPercent: 1.3,
        volatilityIndex: 'STABLE',
        syndicateRiskScore: 55,
        supplyOrigin: 'Naogaon / Dinajpur Mills'
      },
      {
        id: 'c11',
        name: 'Nazirshail Rice',
        nameBn: 'Premium Nazirshail Rice',
        category: 'Grains & Rice',
        unit: 'kg',
        damFairPriceMin: 78,
        damFairPriceMax: 84,
        karwanBazarWholesale: 75,
        retailAvgPrice: 88,
        yesterdayPrice: 88,
        deltaPercent: 0.0,
        volatilityIndex: 'STABLE',
        syndicateRiskScore: 35,
        supplyOrigin: 'Dinajpur'
      },
      {
        id: 'c12',
        name: 'Beef Bone-In',
        nameBn: 'Beef (Bone-In)',
        category: 'Poultry & Meat',
        unit: 'kg',
        damFairPriceMin: 700,
        damFairPriceMax: 750,
        karwanBazarWholesale: 680,
        retailAvgPrice: 780,
        yesterdayPrice: 780,
        deltaPercent: 0.0,
        volatilityIndex: 'STABLE',
        syndicateRiskScore: 25,
        supplyOrigin: 'Gaptoli Cattle Haat'
      },
      {
        id: 'c13',
        name: 'Padma Hilsha 1kg',
        nameBn: 'Fresh Padma Hilsha (1kg grade)',
        category: 'Fish',
        unit: 'kg',
        damFairPriceMin: 1400,
        damFairPriceMax: 1600,
        karwanBazarWholesale: 1350,
        retailAvgPrice: 1850,
        yesterdayPrice: 1750,
        deltaPercent: 5.7,
        volatilityIndex: 'SURGING',
        syndicateRiskScore: 68,
        supplyOrigin: 'Mawa / Chandpur Ghat'
      },
      {
        id: 'c14',
        name: 'Red Lentils Fine',
        nameBn: 'Fine Local Red Lentils',
        category: 'Lentils & Pulses',
        unit: 'kg',
        damFairPriceMin: 130,
        damFairPriceMax: 138,
        karwanBazarWholesale: 125,
        retailAvgPrice: 145,
        yesterdayPrice: 145,
        deltaPercent: 0.0,
        volatilityIndex: 'STABLE',
        syndicateRiskScore: 35,
        supplyOrigin: 'Kushtia / Natore'
      },
      {
        id: 'c15',
        name: 'Imported Coarse Lentils',
        nameBn: 'Canadian Large Grain Lentils',
        category: 'Lentils & Pulses',
        unit: 'kg',
        damFairPriceMin: 100,
        damFairPriceMax: 105,
        karwanBazarWholesale: 96,
        retailAvgPrice: 112,
        yesterdayPrice: 110,
        deltaPercent: 1.8,
        volatilityIndex: 'STABLE',
        syndicateRiskScore: 20,
        supplyOrigin: 'Canada (Chattogram Port)'
      },
      {
        id: 'c16',
        name: 'Refined Sugar',
        nameBn: 'Packaged White Sugar',
        category: 'Sugar & Sweeteners',
        unit: 'kg',
        damFairPriceMin: 125,
        damFairPriceMax: 130,
        karwanBazarWholesale: 122,
        retailAvgPrice: 135,
        yesterdayPrice: 135,
        deltaPercent: 0.0,
        volatilityIndex: 'STABLE',
        syndicateRiskScore: 62,
        supplyOrigin: 'City / Meghna Refineries'
      }
    ];

    this.tcbTrucks = [
      {
        id: 't1',
        locationName: 'Press Club / Secretariat Gate',
        locationNameBn: 'National Press Club & Secretariat',
        thana: 'Shahbagh',
        district: 'Dhaka',
        coordinates: { lat: 23.7291, lng: 90.4079 },
        arrivalStatus: 'STATIONED_SELLING',
        stockLevels: { soybeanOilLiters: 320, lentilsKg: 280, sugarKg: 180, riceKg: 450, onionKg: 300 },
        queueEstimatedWaitMins: 45,
        dealerPhone: '01712-445566'
      },
      {
        id: 't2',
        locationName: 'Mirpur-10 Golchattar (North Side)',
        locationNameBn: 'Mirpur-10 Circle (North Side)',
        thana: 'Mirpur',
        district: 'Dhaka',
        coordinates: { lat: 23.8069, lng: 90.3687 },
        arrivalStatus: 'STATIONED_SELLING',
        stockLevels: { soybeanOilLiters: 150, lentilsKg: 90, sugarKg: 40, riceKg: 220, onionKg: 110 },
        queueEstimatedWaitMins: 60,
        dealerPhone: '01819-223344'
      },
      {
        id: 't3',
        locationName: 'Dhanmondi 32 Bridge Foot',
        locationNameBn: 'Dhanmondi 32 Bridge Adjacent',
        thana: 'Dhanmondi',
        district: 'Dhaka',
        coordinates: { lat: 23.7505, lng: 90.3776 },
        arrivalStatus: 'STATIONED_SELLING',
        stockLevels: { soybeanOilLiters: 280, lentilsKg: 310, sugarKg: 200, riceKg: 400, onionKg: 250 },
        queueEstimatedWaitMins: 30,
        dealerPhone: '01911-889900'
      },
      {
        id: 't4',
        locationName: 'Uttara Sector 7 / Rajlokkhi Complex',
        locationNameBn: 'Uttara Sector 7 (Rajlakshmi Circle)',
        thana: 'Uttara',
        district: 'Dhaka',
        coordinates: { lat: 23.8681, lng: 90.4005 },
        arrivalStatus: 'STATIONED_SELLING',
        stockLevels: { soybeanOilLiters: 400, lentilsKg: 380, sugarKg: 290, riceKg: 500, onionKg: 380 },
        queueEstimatedWaitMins: 25,
        dealerPhone: '01671-556677'
      },
      {
        id: 't5',
        locationName: 'Farmgate Overbridge / Ananda Cinema',
        locationNameBn: 'Farmgate Circle & Ananda Cinema',
        thana: 'Tejgaon',
        district: 'Dhaka',
        coordinates: { lat: 23.7561, lng: 90.3872 },
        arrivalStatus: 'DISPATCHED',
        stockLevels: { soybeanOilLiters: 450, lentilsKg: 400, sugarKg: 300, riceKg: 500, onionKg: 400 },
        queueEstimatedWaitMins: 15,
        dealerPhone: '01715-334455'
      },
      {
        id: 't6',
        locationName: 'Jatrabari Shaheed Farooq Road',
        locationNameBn: 'Jatrabari Shaheed Faruk Road',
        thana: 'Jatrabari',
        district: 'Dhaka',
        coordinates: { lat: 23.7104, lng: 90.4349 },
        arrivalStatus: 'STOCK_OUT',
        stockLevels: { soybeanOilLiters: 0, lentilsKg: 0, sugarKg: 0, riceKg: 15, onionKg: 0 },
        queueEstimatedWaitMins: 0,
        dealerPhone: '01815-112233'
      }
    ];

    this.coldStorages = [
      {
        id: 'cs1',
        facilityName: 'Bikrampur Multi Cold Storage Ltd',
        district: 'Munshiganj',
        upazila: 'Sirajdikhan',
        commodityStored: 'Diamond Potato',
        capacityBags: 120000,
        currentStockBags: 98000,
        occupancyPercent: 81.6,
        gateReleasePriceKg: 27.50,
        rentPerBagPerMonth: 340,
        inspectionStatus: 'COMPLIANT',
        ownerName: 'Al-Hajj Rafiqul Islam'
      },
      {
        id: 'cs2',
        facilityName: 'Munshiganj Agro Chillers',
        district: 'Munshiganj',
        upazila: 'Lohajang',
        commodityStored: 'Red Potato',
        capacityBags: 85000,
        currentStockBags: 79000,
        occupancyPercent: 92.9,
        gateReleasePriceKg: 32.00,
        rentPerBagPerMonth: 380,
        inspectionStatus: 'HOARDING_SUSPECTED',
        ownerName: 'Kazi Mominul Huq'
      },
      {
        id: 'cs3',
        facilityName: 'Bogura Karatoya Cold Storage',
        district: 'Bogura',
        upazila: 'Shibganj',
        commodityStored: 'Potato & Seedlings',
        capacityBags: 150000,
        currentStockBags: 110000,
        occupancyPercent: 73.3,
        gateReleasePriceKg: 26.00,
        rentPerBagPerMonth: 320,
        inspectionStatus: 'COMPLIANT',
        ownerName: 'M. A. Matin'
      },
      {
        id: 'cs4',
        facilityName: 'Rangpur Golden Frost Cold Storage',
        district: 'Rangpur',
        upazila: 'Mithapukur',
        commodityStored: 'Cardinal Potato',
        capacityBags: 90000,
        currentStockBags: 84000,
        occupancyPercent: 93.3,
        gateReleasePriceKg: 31.50,
        rentPerBagPerMonth: 360,
        inspectionStatus: 'HOARDING_SUSPECTED',
        ownerName: 'Nurul Huda'
      }
    ];

    this.whistleReports = [
      {
        id: 'w1',
        trackingToken: 'BZ-REP-91021',
        marketName: 'Mirpur-1 Kitchen Market',
        district: 'Dhaka',
        shopNumberOrSeller: 'Bhai Bhai Traders (Shop #34)',
        violationType: 'PRICE_GOUGING',
        commodityInvolved: 'Local Onion',
        chargedPrice: 120,
        governmentCapPrice: 95,
        overchargeMarginPct: 26.3,
        isAnonymous: true,
        status: 'FINE_IMPOSED',
        actionTakenNotes: 'DNCRP Executive Magistrate raided stall; imposed BDT 15,000 fine for charging 120 BDT vs 95 BDT cap.'
      },
      {
        id: 'w2',
        trackingToken: 'BZ-REP-82314',
        marketName: 'Karwan Bazar Fish Shed',
        district: 'Dhaka',
        shopNumberOrSeller: 'Al-Madina Fish Center',
        violationType: 'DIGITAL_SCALE_FRAUD',
        commodityInvolved: 'Rui Fish',
        chargedPrice: 380,
        governmentCapPrice: 360,
        overchargeMarginPct: 15.0,
        isAnonymous: false,
        status: 'VERIFYING',
        actionTakenNotes: 'Digital scale weight fraud (displaying 1.2kg for 1.0kg net). Under inspection by BSTI & DNCRP.'
      },
      {
        id: 'w3',
        trackingToken: 'BZ-REP-71289',
        marketName: 'Dhanmondi Rapa Plaza Market',
        district: 'Dhaka',
        shopNumberOrSeller: 'General Grocery Row #2',
        violationType: 'REFUSAL_TO_SELL',
        commodityInvolved: 'Soybean Oil (1L Bottled)',
        chargedPrice: 185,
        governmentCapPrice: 167,
        overchargeMarginPct: 10.7,
        isAnonymous: true,
        status: 'MAGISTRATE_DISPATCHED',
        actionTakenNotes: 'Seller hid bottles behind counter claiming stock-out; team dispatched.'
      }
    ];

    this.raidActions = [
      {
        id: 'r1',
        magistrateName: 'Abdul Jabbar (Executive Magistrate)',
        agency: 'DNCRP & Special Task Force',
        targetMarket: 'Kawran Bazar Wholesale Arat',
        district: 'Dhaka',
        infraction: 'Tejgaon egg syndicate hoarding & refusal to display price list board',
        fineAmountBdt: 120000,
        goodsSeizedKg: 8500,
        shopsSealedCount: 2,
        sectionViolated: 'Consumer Rights Act Sec 40'
      },
      {
        id: 'r2',
        magistrateName: 'Farhana Yasmin (Assistant Director)',
        agency: 'DNCRP Mobile Court',
        targetMarket: 'Mohammadpur Krishi Market',
        district: 'Dhaka',
        infraction: 'Tampered digital scale weight cheating & loose oil overpricing',
        fineAmountBdt: 45000,
        goodsSeizedKg: 300,
        shopsSealedCount: 1,
        sectionViolated: 'Weights and Measures Standard Act'
      },
      {
        id: 'r3',
        magistrateName: 'Tariqul Islam (Executive Magistrate)',
        agency: 'District Administration Munshiganj',
        targetMarket: 'Sirajdikhan Cold Storage Cluster',
        district: 'Munshiganj',
        infraction: 'Artificial potato supply choking to drive Dhaka market retail above 55 Tk',
        fineAmountBdt: 250000,
        goodsSeizedKg: 40000,
        shopsSealedCount: 1,
        sectionViolated: 'Essential Commodities Act 1956'
      }
    ];

    this.auditLogs = [
      { action: 'Seed Database Populated', performedBy: 'System Auto-Daemon', timestamp: new Date() },
      { action: 'DNCRP Raid Executed at Karwan Bazar', performedBy: 'Abdul Jabbar', timestamp: new Date(Date.now() - 3600000) }
    ];
  }

  // Retrieval Helpers
  getCommodities() { return this.commodities; }
  getTcbTrucks() { return this.tcbTrucks; }
  getColdStorages() { return this.coldStorages; }
  getWhistleReports() { return this.whistleReports; }
  getRaidActions() { return this.raidActions; }
  getAuditLogs() { return this.auditLogs; }

  addWhistleReport(data) {
    const token = `BZ-REP-${Math.floor(10000 + Math.random() * 90000)}`;
    const newReport = {
      id: `w_${Date.now()}`,
      trackingToken: token,
      ...data,
      status: 'RECEIVED',
      createdAt: new Date()
    };
    this.whistleReports.unshift(newReport);
    this.auditLogs.unshift({
      action: `Whistle Report #${token} Filed`,
      performedBy: data.isAnonymous ? 'Anonymous Citizen' : (data.reporterPhone || 'Citizen'),
      timestamp: new Date()
    });
    return newReport;
  }

  updateReportStatus(id, newStatus, notes = '') {
    const rep = this.whistleReports.find(r => r.id === id || r.trackingToken === id);
    if (rep) {
      rep.status = newStatus;
      if (notes) rep.actionTakenNotes = notes;
      this.auditLogs.unshift({
        action: `Report #${rep.trackingToken} marked as ${newStatus}`,
        performedBy: 'DNCRP Officer / Magistrate',
        timestamp: new Date()
      });
      return rep;
    }
    return null;
  }
}

module.exports = new MockDataService();
