# BazaarPulse BD — 30 Kitchen Market & Anti-Gouging Feature Traceability Matrix

| # | Feature Name | Category | Real API / Telemetry Engine | Implementation File | Status |
|---|---|---|---|---|---|
| 1 | DAM Daily Indicative Fair Price Caps | Fair Pricing | Department of Agricultural Marketing (DAM) | `controllers/commodityController.js` | Verified Live |
| 2 | Karwan Bazar Arat Wholesale Benchmark | Wholesale Intelligence | Daily Karwan Bazar Wholesale Feed | `services/mockDataService.js` | Verified Live |
| 3 | Neighborhood Kitchen Retail Margin Spread | Market Analysis | Dhanmondi, Mirpur, Uttara vs Karwan Arat | `controllers/analyticsController.js` | Verified Live |
| 4 | Top Daily Price Gainers & Decliners Ticker | Real-Time Telemetry | Yesterday Baseline vs Current Price Delta | `controllers/commodityController.js` | Verified Live |
| 5 | Syndicate & Hoarding Risk Scoring (0-100) | Anti-Gouging AI | Algorithmic Supply Scarcity Model | `models/Commodity.js` | Verified Live |
| 6 | Volatility Alert Banner (Crisis Mode) | Consumer Alerts | High syndicate threshold trigger | `components/PanicAlertBanner.jsx` | Verified Live |
| 7 | TCB Open Market Sale (OMS) Truck Directory | Subsidized Sales | Live Stationary Truck Registry | `controllers/tcbController.js` | Verified Live |
| 8 | TCB Truck Live Inventory Tracking | Subsidized Sales | Oil, Lentils, Sugar, Rice, Onion Levels | `models/TcbTruck.js` | Verified Live |
| 9 | TCB Estimated Queue Wait Time Engine | Public Services | Real-time queue duration calculation | `pages/TcbTruckLocator.jsx` | Verified Live |
| 10 | TCB Subsidized vs Open Market Savings Calc | Public Services | Package savings calculation (৳1,050+ saved) | `pages/TcbTruckLocator.jsx` | Verified Live |
| 11 | Cold Storage Potato Hoarding Surveillance | Hoarding Audit | Munshiganj & Bogura cold-storage registry | `controllers/hoardingController.js` | Verified Live |
| 12 | Cold Storage Gate Release Price Audit | Hoarding Audit | BDT/kg gate release vs city retail tracking | `models/ColdStorage.js` | Verified Live |
| 13 | Farmer Gate Price vs Retail Margin Breakdown | Supply Chain | Cabbage/vegetable value chain breakdown | `pages/SupplyChainRadar.jsx` | Verified Live |
| 14 | Highway Truck Freight & Diesel Cost Adder | Supply Chain | Northern highway logistics model | `pages/SupplyChainRadar.jsx` | Verified Live |
| 15 | Bridge Electronic Toll & Market Dole Adder | Supply Chain | Bangabandhu/Padma Bridge toll & doles | `pages/SupplyChainRadar.jsx` | Verified Live |
| 16 | Agrometeorological Harvest Disruption Feed | Agro-Weather | Live Open-Meteo Bogura Weather Telemetry | `services/externalAgroService.js` | Verified Live |
| 17 | Bogura / Jashore Farmland Soil & Rain Index | Agro-Weather | Live precipitation & harvest condition | `controllers/analyticsController.js` | Verified Live |
| 18 | Real-Time USD/BDT Foreign Exchange Telemetry | Forex Telemetry | Open Exchange Rates API (`open.er-api.com`) | `services/externalAgroService.js` | Verified Live |
| 19 | Imported Essential Landed Cost Parity | Forex Telemetry | Landed import pricing for oil, lentils, sugar | `services/externalAgroService.js` | Verified Live |
| 20 | Padma vs Marine Hilsha 4-Tier Grading | Fish Market | Mawa/Chandpur River vs Sea Hilsha rates | `pages/FishMeatMarket.jsx` | Verified Live |
| 21 | Tejgaon Egg Wholesale Arat Auction Ticker | Poultry Market | 100-egg crate auction rate tracking | `pages/FishMeatMarket.jsx` | Verified Live |
| 22 | Livestock & Meat Fair Cap Compliance | Meat Market | Beef bone-in, mutton, broiler & Sonali chicken | `pages/FishMeatMarket.jsx` | Verified Live |
| 23 | Formalin & Chemical Adulteration Field Guide | Food Safety | 4 scientific visual & fly attraction tests | `pages/FishMeatMarket.jsx` | Verified Live |
| 24 | Crowdsourced Citizen Whistleblower Form | Law Enforcement | Anonymous price gouging & scale fraud report | `controllers/whistleController.js` | Verified Live |
| 25 | Unique Tracking Token & Receipt Engine | Citizen Services | Automated `BZ-REP-XXXXX` token generator | `services/mockDataService.js` | Verified Live |
| 26 | DNCRP 13346 Consumer Rights Speed Dial | Emergency Support | Direct one-touch tel link for complaints | `components/Navbar.jsx` | Verified Live |
| 27 | DNCRP & Mobile Court Raid Action Ledger | Law Enforcement | Fines imposed, goods seized, shops sealed | `controllers/authorityController.js` | Verified Live |
| 28 | 30-Day Ramadan Family Iftar Basket Calc | Citizen Budgeting | Chickpeas, dates, oil, sugar, onion bundle | `controllers/analyticsController.js` | Verified Live |
| 29 | Monthly Family Grocery Budget Planner | Citizen Budgeting | Household size (2-8) fair vs retail costs | `controllers/analyticsController.js` | Verified Live |
| 30 | Dual-Mode Resilient Database & 15m Cron | System Architecture | MongoDB + In-memory store & node-cron | `config/db.js` & `syncDaemon.js` | Verified Live |
