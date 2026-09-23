import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Phone, Clock, AlertCircle, CheckCircle2, Navigation } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Helper component to smoothly pan when active truck changes
function MapRecenter({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center && center[0] && center[1]) {
      map.flyTo(center, zoom || 13, { duration: 1.2 });
    }
  }, [center, zoom, map]);
  return null;
}

// Custom DivIcons with live SVG pulses
const createTruckIcon = (status) => {
  let color = '#10b981'; // emerald
  let pulseClass = 'animate-ping';
  let label = 'Selling';

  if (status === 'DISPATCHED') {
    color = '#f59e0b'; // amber
    label = 'En Route';
  } else if (status === 'STOCK_OUT') {
    color = '#f43f5e'; // rose
    pulseClass = '';
    label = 'Empty';
  }

  const html = `
    <div style="position: relative; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center;">
      ${pulseClass ? `<div style="position: absolute; width: 100%; height: 100%; border-radius: 9999px; background-color: ${color}; opacity: 0.35; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>` : ''}
      <div style="position: relative; width: 28px; height: 28px; background-color: #0f172a; border: 2.5px solid ${color}; border-radius: 9999px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.5);">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/>
          <path d="M15 18H9"/>
          <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/>
          <circle cx="17" cy="18" r="2"/>
          <circle cx="7" cy="18" r="2"/>
        </svg>
      </div>
    </div>
  `;

  return L.divIcon({
    className: 'tcb-custom-marker',
    html,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -20],
  });
};

export default function TcbMap({ trucks = [], selectedTruck = null, onSelectTruck }) {
  const { lang } = useLanguage();

  // Default center: Dhaka city center (Kawran Bazar / Farmgate latitude/longitude)
  const defaultCenter = [23.7509, 90.3934];
  const center = selectedTruck?.coordinates 
    ? [selectedTruck.coordinates.lat, selectedTruck.coordinates.lng]
    : defaultCenter;

  return (
    <div className="relative w-full h-[400px] sm:h-[480px] rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
      <MapContainer
        center={defaultCenter}
        zoom={12}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        {/* Dark-themed OpenStreetMap / CartoDB tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        <MapRecenter center={center} zoom={selectedTruck ? 14 : 12} />

        {trucks.map((truck) => {
          if (!truck.coordinates || !truck.coordinates.lat || !truck.coordinates.lng) return null;
          const isSelected = selectedTruck?.id === truck.id;

          return (
            <Marker
              key={truck.id || truck._id}
              position={[truck.coordinates.lat, truck.coordinates.lng]}
              icon={createTruckIcon(truck.arrivalStatus)}
              eventHandlers={{
                click: () => {
                  if (onSelectTruck) onSelectTruck(truck);
                }
              }}
            >
              <Popup>
                <div className="p-1 min-w-[220px]">
                  <div className="flex justify-between items-start gap-1 pb-1.5 border-b border-slate-700">
                    <div>
                      <h4 className="font-bold text-xs text-white leading-tight">
                        {lang === 'bn' ? truck.locationNameBn : truck.locationName}
                      </h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Thana: {truck.thana}, {truck.district}
                      </p>
                    </div>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase ${
                      truck.arrivalStatus === 'STATIONED_SELLING' ? 'bg-emerald-500/20 text-emerald-400' :
                      truck.arrivalStatus === 'STOCK_OUT' ? 'bg-rose-500/20 text-rose-400' :
                      'bg-amber-500/20 text-amber-400'
                    }`}>
                      {truck.arrivalStatus === 'STATIONED_SELLING' ? 'Live Selling' :
                       truck.arrivalStatus === 'STOCK_OUT' ? 'Stock Out' : 'En Route'}
                    </span>
                  </div>

                  {/* Stock Levels */}
                  <div className="my-2 space-y-1 text-[11px] text-slate-300">
                    <div className="flex justify-between">
                      <span>Soybean Oil (তেল):</span>
                      <strong className={truck.stockLevels.soybeanOilLiters < 50 ? 'text-rose-400' : 'text-emerald-400'}>
                        {truck.stockLevels.soybeanOilLiters}L
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Lentils (মসুর ডাল):</span>
                      <strong className={truck.stockLevels.lentilsKg < 50 ? 'text-rose-400' : 'text-emerald-400'}>
                        {truck.stockLevels.lentilsKg}kg
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Sugar (চিনি):</span>
                      <strong className="text-slate-200">{truck.stockLevels.sugarKg}kg</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Rice (চাল):</span>
                      <strong className="text-slate-200">{truck.stockLevels.riceKg}kg</strong>
                    </div>
                  </div>

                  {/* Queue & Call */}
                  <div className="pt-2 border-t border-slate-700 flex justify-between items-center text-[10px]">
                    <span className="text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>{truck.queueEstimatedWaitMins}m wait</span>
                    </span>
                    <a
                      href={`tel:${truck.dealerPhone}`}
                      className="px-2 py-0.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1"
                    >
                      <Phone className="w-2.5 h-2.5" />
                      <span>Call Dealer</span>
                    </a>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Floating Legend Badge */}
      <div className="absolute top-3 right-3 z-[1000] bg-slate-900/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-2.5 shadow-xl text-[10px] space-y-1">
        <div className="flex items-center gap-1.5 text-slate-300">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span>Stationed Selling</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-300">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
          <span>Dispatched / En Route</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-300">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
          <span>Stock Out</span>
        </div>
      </div>
    </div>
  );
}
