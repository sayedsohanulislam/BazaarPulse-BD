# BazaarPulse BD — National Kitchen Market Fair Pricing & Anti-Gouging Intelligence 🇧🇩🛒

BazaarPulse BD is a production-grade civic intelligence platform engineered for Bangladesh. It bridges the critical information gap between farmers, wholesale *aratdars* (e.g. Karwan Bazar, Khatunganj), and urban retail consumers, empowering citizens with daily Department of Agricultural Marketing (DAM) fair price benchmarks, Trading Corporation of Bangladesh (TCB) open-market sales truck tracking, syndicate volatility detection, cold storage hoarding audits, live Open-Meteo agrometeorological & USD/BDT import parity telemetry, and direct reporting to the Directorate of National Consumer Rights Protection (DNCRP).

## 🚀 Key Architectural Capabilities
- **Real-Time Agrometeorological & Forex Telemetry:** Live Open-Meteo Bogura harvest weather telemetry and real-time USD/BDT conversion computing import landed costs for crude edible oil, sugar, and pulses.
- **Dual-Mode Resilient Database:** Automatic detection and synchronization between local MongoDB Atlas (`mongodb://127.0.0.1:27017/bazaarpulse_bd`) and an in-memory transactional mock store ensuring 100% uptime in serverless Vercel environments.
- **Full 30-Feature Kitchen Market Matrix:** Wholesale vs retail spreads, TCB truck inventory tracker, cold storage hoarding audits, farmer-to-consumer margin breakdowns, Padma Hilsha grading, Tejgaon egg arat auctions, and DNCRP mobile court raid ledgers.
- **Bilingual Interface:** Full English and Bangla (বাংলা) support.
- **Role-Based Portals:** Citizen Consumer, Wholesale Aratdar, DNCRP Executive Magistrate, and System Administrator privileges.

## 📁 Repository Structure
```
BazaarPulse BD/
├── backend/
│   ├── config/          # Dual-mode MongoDB / In-memory connection
│   ├── controllers/     # Commodity, TCB, Hoarding, Whistle, Analytics, Authority
│   ├── models/          # Mongoose Schemas (Commodity, TcbTruck, ColdStorage, etc.)
│   ├── routes/          # Express REST API routes mounted under /api/
│   ├── services/        # External Agro/Forex API consumer, Mock store, Sync daemon
│   └── server.js        # Express application entry (Port 5004)
├── frontend/
│   ├── src/
│   │   ├── components/  # Navbar, Footer, PanicAlertBanner, AuthModal
│   │   ├── context/     # Language, Auth, Bazaar Contexts
│   │   ├── pages/       # Home, Heatmap, TCB, SupplyChain, FishMeat, Agro, Whistle, Budget, Authority
│   │   └── services/    # Axios API client
│   └── vite.config.js   # Vite configuration (Port 5177)
├── docs/
│   └── FEATURE_TRACEABILITY.md # Matrix of 30 features
└── vercel.json          # Serverless Vercel deployment specification
```

## 🛠️ Local Development

### Prerequisites
- Node.js v18+
- npm v9+
- Optional: MongoDB running on `mongodb://127.0.0.1:27017`

### Backend Setup
```bash
cd backend
npm install
npm start
# Runs on http://localhost:5004
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5177
```
