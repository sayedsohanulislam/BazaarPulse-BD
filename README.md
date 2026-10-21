# BazaarPulse BD — National Kitchen Market Fair Pricing & Anti-Gouging Intelligence 🇧🇩🏆🛒

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live%20Production-10b981?style=for-the-badge&logo=vercel&logoColor=white)](https://bazaarpulse-bd.vercel.app)
[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9-199900?style=for-the-badge&logo=leaflet&logoColor=white)](https://leafletjs.com)

> **Live Production URL:** [https://bazaarpulse-bd.vercel.app](https://bazaarpulse-bd.vercel.app)  
> **Repository:** [https://github.com/sayedsohanulislam/BazaarPulse-BD](https://github.com/sayedsohanulislam/BazaarPulse-BD)  
> **BASIS National ICT Award 2026 Nominee • Smart Bangladesh Civic Tech Category**

---

## 🌟 Executive Summary

**BazaarPulse BD** is an enterprise-grade civic market intelligence platform engineered for Bangladesh. It bridges the critical information gap between farmers, wholesale *aratdars* (e.g. Karwan Bazar, Khatunganj), and urban retail consumers.

By cross-referencing statutory **Department of Agricultural Marketing (DAM)** fair price benchmarks, live **Trading Corporation of Bangladesh (TCB)** subsidized truck fleets, **Open-Meteo** agrometeorological satellite telemetry, and real-time **USD/BDT forex parity**, BazaarPulse BD equips 170M citizens with algorithmic defenses against artificial market cartels and price gouging.

---

## 🏛️ The 12 Homepage Sections (7 Dynamic Interactive Units)

| # | Section | Interactivity / Dynamic State | Primary Role |
|---|---|---|---|
| **1** | **Navbar** | ⚡ **Dynamic** | Live BST digital clock, global `Ctrl+K` command search, fair basket slide-out drawer, mobile drawer. |
| **2** | **Hero** | ⚡ **Dynamic** | Front-and-center search with autocomplete (`CommoditySearchAutocomplete`), live Karwan Bazar ticker tape, quick CTAs. |
| **3** | **Trusted By / Stats** | ⚡ **Dynamic** | Official citations (DAM, TCB, DNCRP, BBS) + real-time counters (16+ commodities, 64 districts, 142+ verified reports, 15s telemetry cycle). |
| **4** | **Features & Civic Services** | ⚡ **Dynamic** | Interactive **Market Stability Sentinel Radial Gauge (0-100)**, instant price gouging checker, and interactive 8-division telemetry selector. |
| **5** | **About / Why Choose Us** | Static / Informative | Architectural pillars: algorithmic fair benchmarking, geospatial TCB truck accessibility, and DNCRP Section 40 legal recourse. |
| **6** | **How It Works** | ⚡ **Dynamic** | Interactive 4-stage civic pipeline stepper (Telemetry Ingestion ➔ Fair Price Modeling ➔ Anomaly Detection ➔ Legal Enforcement). |
| **7** | **Featured Products / Movers** | ⚡ **Dynamic** | Daily Top Risers (+%) & Fallers (-%) tabbed matrix, 7/30/90-day interactive SVG trend charts, price status badges with icons, and CSV export. |
| **8** | **Testimonials** | Static / Endorsements | Verified statements from supply chain economists, student market vigilance volunteers, homemakers, and retail shop owners. |
| **9** | **FAQ** | ⚡ **Dynamic** | Categorized accordion with live keyword search across legal, formula, and TCB truck questions. |
| **10** | **Final CTA** | ⚡ **Dynamic** | "Never Overpay Again" call to action + instant modal trigger for Email/Telegram price alert subscriptions. |
| **11** | **Footer** | Dynamic / Form | Weekly price digest newsletter signup, regulatory source directory, emergency hotlines (13346, 16122), and open data licensing. |
| **12** | **Extra Section — Methodology & API** | ⚡ **Dynamic** | Mathematical formula breakdown under Agricultural Marketing Act 2018 + public REST API explorer with 1-click cURL copy. |

---

## 📊 Core Product Capabilities

### 1. Multi-State Price Status Badges (Never Color Alone)
Every commodity displays both an explicit icon and text label:
- 🟢 **Fair Price** (`<ShieldCheck />`): Within DAM statutory price ceiling.
- 🟡 **Slightly High** (`<AlertTriangle />`): 1% to 10% above benchmark.
- 🟠 **Overpriced** (`<AlertCircle />`): 11% to 25% above benchmark.
- 🔴 **Syndicate Gouging** (`<AlertOctagon />`): >25% above statutory ceiling (1-click DNCRP reporting).

### 2. Interactive Geospatial Truck Tracking (`TcbMap.jsx`)
- Interactive OpenStreetMap with pulsing SVG pins (🟢 Active, 🟡 En Route, 🔴 Stock Exhausted).
- Real-time stock meters for subsidized Soybean Oil (৳100), Lentils (৳60), Sugar (৳70), and Rice (৳30).
- Haversine GPS proximity calculator sorting points closest to the citizen's device.
- Citizen SMS arrival alert simulator (`TcbSmsModal.jsx`).

### 3. Citizen 3-Way Fair Price Basket (`BasketDrawer.jsx`)
- Compares grocery costs across **DAM Government Fair Caps**, **Karwan Bazar Wholesale**, and **Open Retail Rates**.
- Generates a printable, verifiable Price Audit Document with simulated QR code and DNCRP complaint guidelines.

### 4. 7 / 30 / 90-Day Trend Charts & Social Share Cards
- Zero-dependency client-side SVG line charts with interactive hover tooltips, high/low spread markers, and 1-click CSV export.
- 1-click formatted social share cards for WhatsApp and Facebook ("Onion is 38% above fair price in Dhaka today").

---

## 📐 Mathematical Fair Price Methodology

Under the **Agricultural Marketing Act 2018**, the statutory retail ceiling is calculated as:

$$\text{Fair Retail Cap} = \left[ (\text{Farmgate Base} \times (1 + \text{Wastage})) + \text{Packaging} + \text{Freight} \right] \times (1 + \text{Max Retail Margin})$$

- **Statutory Retail Margin:** Capped at 12% above landed wholesale cost.
- **Citizen Bounty (Section 40):** Whistleblowers who submit verified evidence via BazaarPulse BD receive **25% of court-imposed fines** recovered by mobile court magistrates.

---

## 🛠️ Installation & Local Setup

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/sayedsohanulislam/BazaarPulse-BD.git
cd BazaarPulse-BD

# Install Backend
cd backend && npm install

# Install Frontend
cd ../frontend && npm install
```

### 2. Run Test Suites
```bash
# Verify Backend Telemetry (Agro, Forex, TCB, Commodities)
node backend/test-bazaar.js

# Verify Price Calculation Logic & Legal Formulas
node backend/test-price-calc.js
```

### 3. Launch Development Servers
```bash
# Terminal 1: Backend Server (Port 5004)
cd backend && npm start

# Terminal 2: Frontend Client (Port 5177)
cd frontend && npm run dev
```

### 4. Production Build
```bash
cd frontend && npm run build
```

---

## 📄 License & Attribution
Licensed under the **MIT Open Source License**. Indicative benchmarks synthesized from the Department of Agricultural Marketing (DAM), Trading Corporation of Bangladesh (TCB), and community citizen reports.
