import React, { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  Polygon,
} from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import {
  Thermometer,
  Droplets,
  Wind,
  Calendar,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  CloudRain,
} from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapPage.css';

import { callForActions } from '../data/callForActions';
import { seaLevelRiseData } from '../data/seaLevelRise';
import {
  pollutionDangerData,
  getPollutionDangerIntensity,
} from '../data/pollution';
import {
  corrosionRiskData,
  getCorrosionRiskIntensity,
} from '../data/corrosion';
import CallForActionMarker from '../components/CallForActionMarker';
import HeatmapLayer from '../components/HeatmapLayer';
import MapClickHandler from '../components/MapClickHandler';

// Leaflet default-marker fix
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

// Types
interface ClimateDataPoint {
  id: number;
  latitude: number;
  longitude: number;
  temperature: number;
  humidity: number;
  wind_speed: number;
  precipitation: number;
  data_type: string;
  location_name: string;
  recorded_at: string;
}

interface LegendProps {
  selectedDataTypes: string[];
  showActions: boolean;
  showSeaLevelRise: boolean;
  showPollutionDanger: boolean;
  showCorrosionRisk: boolean;
  selectedActionTypes: string[];
}

// Action types configuration - keys now match the actual data
const ACTION_TYPES = [
  { key: 'Protest', label: 'Protests', color: '#793a42' },
  { key: 'Cleanup', label: 'Clean-ups', color: '#97988a' },
  { key: 'Workshop', label: 'Workshops', color: '#bd6f48' },
  { key: 'Seminar', label: 'Seminars', color: '#0b2943' },
  { key: 'Virtual', label: 'Virtual Events', color: '#9198ab' },
  { key: 'Training', label: 'Training', color: '#b6883b' },
  { key: 'Science', label: 'Citizen Science', color: '#3f4b35' },
];

// Climate data types configuration
const CLIMATE_DATA_TYPES = [
  { key: 'temperature', label: 'Temperature', icon: <Thermometer size={18} /> },
  { key: 'humidity', label: 'Humidity', icon: <Droplets size={18} /> },
  { key: 'wind_speed', label: 'Wind Speed', icon: <Wind size={18} /> },
  { key: 'precipitation', label: 'Precipitation', icon: <CloudRain size={18} /> },
];

// Helpers
const balticSeaCenter: LatLngExpression = [59.0, 19.0];
const MASK_BOUNDS: [number, number][] = [
  [-90, -180],
  [-90, 180],
  [90, 180],
  [90, -180],
  [-90, -180],
];

const getMaskPolygon = (featureGeoJSON: any): LatLngExpression[][] | null => {
  if (!featureGeoJSON?.features?.length) return null;
  const geom = featureGeoJSON.features[0].geometry;
  const outer = MASK_BOUNDS;
  let maskHoles: LatLngExpression[][] = [];

  if (geom.type === 'Polygon') {
    maskHoles = geom.coordinates.map(
        (ring: [number, number][]) => ring.map(([lng, lat]) => [lat, lng]),
    );
    return [outer, ...maskHoles];
  }
  if (geom.type === 'MultiPolygon') {
    maskHoles = geom.coordinates
        .flat()
        .map((ring: [number, number][]) => ring.map(([lng, lat]) => [lat, lng]));
    return [outer, ...maskHoles];
  }
  return null;
};

const normalizeSeaLevelRise = (value: number) => {
  const minValue = 0.1;
  const maxValue = 0.89;
  return Math.min(Math.max((value - minValue) / (maxValue - minValue), 0), 1);
};

// Legend building blocks
const Swatch: React.FC<{ color: string; label: string }> = ({ color, label }) => (
    <div className="flex items-center space-x-2">
      <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: color }} />
      <span>{label}</span>
    </div>
);

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-3 last:mb-0">
      <h4 className="font-medium mb-1">{title}</h4>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
);

const Legend: React.FC<LegendProps> = ({
                                         selectedDataTypes,
                                         showActions,
                                         showSeaLevelRise,
                                         showPollutionDanger,
                                         showCorrosionRisk,
                                         selectedActionTypes,
                                       }) => (
    <>
      {showActions && selectedActionTypes.length > 0 && (
          <Section title="Calls for Action">
            {ACTION_TYPES.filter(type => selectedActionTypes.includes(type.key)).map(type => (
                <Swatch key={type.key} color={type.color} label={type.label} />
            ))}
          </Section>
      )}

      {selectedDataTypes.includes('temperature') && (
          <Section title="Temperature (°C)">
            <Swatch color="#ef4444" label="> 16" />
            <Swatch color="#f59e0b" label="12 – 16" />
            <Swatch color="#3b82f6" label="< 12" />
          </Section>
      )}

      {selectedDataTypes.includes('humidity') && (
          <Section title="Humidity (%)">
            <Swatch color="#1f2937" label="> 75" />
            <Swatch color="#6b7280" label="60 – 75" />
            <Swatch color="#9ca3af" label="< 60" />
          </Section>
      )}

      {selectedDataTypes.includes('wind_speed') && (
          <Section title="Wind Speed (km/h)">
            <Swatch color="#000000" label="> 15" />
            <Swatch color="#6b7280" label="10 – 15" />
            <Swatch color="#d1d5db" label="< 10" />
          </Section>
      )}

      {selectedDataTypes.includes('precipitation') && (
          <Section title="Precipitation (mm)">
            <Swatch color="#3b82f6" label="< 1" />
            <Swatch color="#60a5fa" label="1 – 3" />
            <Swatch color="#1e40af" label="> 3" />
          </Section>
      )}

      {showSeaLevelRise && (
          <Section title="Sea-level Rise (m)">
            <Swatch color="#3b82f6" label="0.1 – 0.3" />
            <Swatch color="#06b6d4" label="0.3 – 0.5" />
            <Swatch color="#10b981" label="0.5 – 0.6" />
            <Swatch color="#f59e0b" label="0.6 – 0.8" />
            <Swatch color="#ef4444" label="0.8 – 0.9" />
          </Section>
      )}

      {showPollutionDanger && (
          <Section title="Pollution Danger">
            <Swatch color="#1de9b6" label="Lowest" />
            <Swatch color="#7e57c2" label="Low" />
            <Swatch color="#ffee58" label="Moderate" />
            <Swatch color="#ffa726" label="High" />
            <Swatch color="#d32f2f" label="Highest" />
          </Section>
      )}

      {showCorrosionRisk && (
          <Section title="Coastal Corrosion Risk">
            <Swatch color="#43a047" label="Lowest" />
            <Swatch color="#ffee58" label="Low" />
            <Swatch color="#fbc02d" label="Moderate" />
            <Swatch color="#fb8c00" label="High" />
            <Swatch color="#d32f2f" label="Critical" />
          </Section>
      )}
    </>
);

// Main component
const MapPage: React.FC = () => {
  const [climateData, setClimateData] = useState<ClimateDataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedDataTypes, setSelectedDataTypes] = useState<string[]>([]);
  const [showActions, setShowActions] = useState(true);
  const [showSeaLevelRise, setShowSeaLevelRise] = useState(false);
  const [showPollutionDanger, setShowPollutionDanger] = useState(false);
  const [showCorrosionRisk, setShowCorrosionRisk] = useState(true);
  const [panelOpen, setPanelOpen] = useState(true);

  // New states for collapsible action types
  const [actionsExpanded, setActionsExpanded] = useState(false);
  const [selectedActionTypes, setSelectedActionTypes] = useState<string[]>(
      ACTION_TYPES.map(type => type.key)
  );

  const [highlightFeature, setHighlightFeature] = useState<any>(null);

  // Fetch mock climate data
  useEffect(() => {
    const mock: ClimateDataPoint[] = [
      {
        id: 1,
        latitude: 59.3293,
        longitude: 18.0686,
        temperature: 15.5,
        humidity: 75,
        wind_speed: 12.3,
        precipitation: 2.1,
        data_type: 'temperature',
        location_name: 'Stockholm',
        recorded_at: '2025-07-26T10:00:00Z',
      },
      {
        id: 2,
        latitude: 60.1699,
        longitude: 24.9384,
        temperature: 14.2,
        humidity: 78,
        wind_speed: 15.6,
        precipitation: 3.4,
        data_type: 'temperature',
        location_name: 'Helsinki',
        recorded_at: '2025-07-26T10:00:00Z',
      },
      {
        id: 3,
        latitude: 54.352,
        longitude: 18.6466,
        temperature: 16.8,
        humidity: 72,
        wind_speed: 8.9,
        precipitation: 1.2,
        data_type: 'temperature',
        location_name: 'Gdańsk',
        recorded_at: '2025-07-26T10:00:00Z',
      },
      {
        id: 4,
        latitude: 56.1629,
        longitude: 15.5866,
        temperature: 13.9,
        humidity: 80,
        wind_speed: 18.2,
        precipitation: 4.7,
        data_type: 'temperature',
        location_name: 'Kalmar',
        recorded_at: '2025-07-26T10:00:00Z',
      },
    ];

    setClimateData(mock);
    setLoading(false);
  }, []);

  // Load Baltic highlight GeoJSON
  useEffect(() => {
    fetch('baltic_highlight.geojson')
        .then((res) => res.json())
        .then(setHighlightFeature)
        .catch((err) => console.error('Failed to load highlight:', err));
  }, []);

  const getMarkerColor = (d: ClimateDataPoint, type: string) => {
    switch (type) {
      case 'temperature':
        if (d.temperature > 16) return '#ef4444';
        if (d.temperature > 12) return '#f59e0b';
        return '#3b82f6';
      case 'humidity':
        if (d.humidity > 75) return '#1f2937';
        if (d.humidity > 60) return '#6b7280';
        return '#9ca3af';
      case 'wind_speed':
        if (d.wind_speed > 15) return '#000000';
        if (d.wind_speed > 10) return '#6b7280';
        return '#d1d5db';
      case 'precipitation':
        if (d.precipitation > 3) return '#1e40af';
        if (d.precipitation > 1) return '#60a5fa';
        return '#3b82f6';
      default:
        return '#6b7280';
    }
  };

  // Handle master checkbox toggle
  const handleMasterActionToggle = () => {
    if (showActions && selectedActionTypes.length > 0) {
      setShowActions(false);
      setSelectedActionTypes([]);
    } else {
      setShowActions(true);
      setSelectedActionTypes(ACTION_TYPES.map(type => type.key));
    }
  };

  // Handle individual action type toggle
  const handleActionTypeToggle = (actionType: string) => {
    setSelectedActionTypes(prev => {
      const newSelection = prev.includes(actionType)
          ? prev.filter(type => type !== actionType)
          : [...prev, actionType];
      setShowActions(newSelection.length > 0);
      return newSelection;
    });
  };

  if (loading) {
    return (
        <div className="h-screen w-screen flex items-center justify-center pt-20">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600" />
        </div>
    );
  }

  return (
      <div className="h-screen w-screen overflow-hidden relative pt-20">
        {/* Floating control panel */}
        <div
            className={`absolute top-40 left-4 z-[1000] bg-white border border-gray-300 shadow-lg 
          transition-all duration-300 ${panelOpen ? 'max-w-xs p-4' : 'w-11 p-2'}`}
        >
          <button
              onClick={() => setPanelOpen(!panelOpen)}
              aria-label="Toggle panel"
              className="absolute -right-3 top-1/2 -translate-y-1/2 bg-white border border-gray-300
                     rounded-full p-1 shadow focus:outline-none"
          >
            {panelOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>

          {panelOpen && (
              <>
                {/* Calls for Action Section with collapsible details */}
                <div className="mb-4">
                  <h3 className="text-sm font-medium mb-2">Calls for Action</h3>

                  {/* Master checkbox with arrow */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2 text-sm cursor-pointer flex-1">
                      <input
                          type="checkbox"
                          checked={showActions && selectedActionTypes.length > 0}
                          onChange={handleMasterActionToggle}
                      />
                      <Calendar size={14} />
                      <span>All Actions ({selectedActionTypes.length})</span>
                    </label>
                    <button
                        onClick={() => setActionsExpanded(!actionsExpanded)}
                        className="p-1 hover:bg-gray-100 rounded"
                        aria-label="Toggle action types"
                    >
                      {actionsExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                  </div>

                  {actionsExpanded && (
                      <div className="mt-2 ml-6 space-y-1 border-l-2 border-gray-200 pl-3">
                        {ACTION_TYPES.map(actionType => (
                            <label key={actionType.key} className="flex items-center space-x-2 text-xs cursor-pointer">
                              <input
                                  type="checkbox"
                                  checked={selectedActionTypes.includes(actionType.key)}
                                  onChange={() => handleActionTypeToggle(actionType.key)}
                                  className="scale-75"
                              />
                              <div
                                  className="w-3 h-3 rounded-sm"
                                  style={{ backgroundColor: actionType.color }}
                              />
                              <span>{actionType.label}</span>
                            </label>
                        ))}
                      </div>
                  )}
                </div>

                {/* Climate Data Section */}
                <div className="border-t border-gray-200 pt-4 mb-4">
                  <h3 className="text-sm font-medium mb-3">Climate Data</h3>
                  <div className="space-y-2">
                    {CLIMATE_DATA_TYPES.map(({ key, label, icon }) => (
                        <label key={key} className="flex items-center space-x-2 text-sm cursor-pointer">
                          <input
                              type="checkbox"
                              checked={selectedDataTypes.includes(key)}
                              onChange={() =>
                                  setSelectedDataTypes((prev) =>
                                      prev.includes(key) ? prev.filter((t) => t !== key) : [...prev, key],
                                  )
                              }
                          />
                          {icon}
                          <span>{label}</span>
                        </label>
                    ))}
                  </div>
                </div>

                {/* Climate Risks Section */}
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-sm font-medium mb-3">Climate Risks</h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 text-sm cursor-pointer">
                      <input
                          type="checkbox"
                          checked={showSeaLevelRise}
                          onChange={() => setShowSeaLevelRise(!showSeaLevelRise)}
                      />
                      <TrendingUp size={14} />
                      <span>Flooding (Sea-level Rise)</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm cursor-pointer">
                      <input
                          type="checkbox"
                          checked={showPollutionDanger}
                          onChange={() => setShowPollutionDanger(!showPollutionDanger)}
                      />
                      <Droplets size={14} />
                      <span>Pollution Danger</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm cursor-pointer">
                      <input
                          type="checkbox"
                          checked={showCorrosionRisk}
                          onChange={() => setShowCorrosionRisk(!showCorrosionRisk)}
                      />
                      <TrendingUp size={14} />
                      <span>Coastal Corrosion</span>
                    </label>
                  </div>
                </div>
              </>
          )}
        </div>

        {/* Map */}
        <MapContainer center={balticSeaCenter} zoom={5} className="h-full w-full">
          <TileLayer
              attribution="&copy; OpenStreetMap contributors & CartoDB"
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />

          {/* Baltic highlight mask */}
          {highlightFeature && (
              <Polygon
                  positions={getMaskPolygon(highlightFeature) ?? []}
                  pathOptions={{ color: 'black', fillColor: 'black', fillOpacity: 0.3, weight: 0 }}
                  interactive={false}
              />
          )}

          {/* Climate data markers */}
          {selectedDataTypes.map((type) =>
              climateData.map((d) => (
                  <CircleMarker
                      key={`${d.id}-${type}`}
                      center={[d.latitude, d.longitude]}
                      radius={12}
                      fillColor={getMarkerColor(d, type)}
                      color="#000"
                      weight={1}
                      opacity={1}
                      fillOpacity={0.8}
                  >
                    <Popup>
                      <div className="p-2 space-y-1 text-sm">
                        <h4 className="font-medium text-base mb-2">{d.location_name}</h4>
                        <div className="flex items-center space-x-2">
                          <Thermometer className="h-4 w-4" />
                          <span>Temp: {d.temperature} °C</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Droplets className="h-4 w-4" />
                          <span>Humidity: {d.humidity}%</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Wind className="h-4 w-4" />
                          <span>Wind: {d.wind_speed} km/h</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CloudRain className="h-4 w-4" />
                          <span>Precip: {d.precipitation} mm</span>
                        </div>
                        <div className="text-xs text-gray-500 pt-1">
                          Updated: {new Date(d.recorded_at).toLocaleString()}
                        </div>
                      </div>
                    </Popup>
                  </CircleMarker>
              )),
          )}

          {/* Environmental actions */}
          {showActions &&
              callForActions
                  .filter((action) => selectedActionTypes.includes(action.type))
                  .map((a, idx) => {
                    // Find the original index of this action in the full callForActions array
                    const originalIndex = callForActions.findIndex(action => action === a);
                    return (
                        <CallForActionMarker 
                          key={`action-${originalIndex}`} 
                          action={a} 
                          actionIndex={originalIndex}
                        />
                    );
                  })}

          {/* Sea-level rise heat-map */}
          <HeatmapLayer
              data={seaLevelRiseData.map((p) => [p.lat, p.lng, normalizeSeaLevelRise(p.value)])}
              visible={showSeaLevelRise}
          />

          {/* Pollution danger heatmap */}
          <HeatmapLayer
              data={pollutionDangerData.map((p) => [
                p.lat,
                p.lng,
                getPollutionDangerIntensity(p.value),
              ])}
              visible={showPollutionDanger}
          />

          {/* Coastal corrosion risk heatmap */}
          <HeatmapLayer
              data={corrosionRiskData.map((p) => [
                p.lat,
                p.lng,
                getCorrosionRiskIntensity(p.value),
              ])}
              visible={showCorrosionRisk}
          />

          {/* Climate Risk Click Handler */}
          <MapClickHandler highlightFeature={highlightFeature} />
        </MapContainer>

        {/* Legend */}
        <div
            className="absolute bottom-8 right-4 z-[1000] max-w-sm bg-white/90 backdrop-blur
                   border border-gray-300 p-4 text-xs leading-snug"
        >
          <Legend
              selectedDataTypes={selectedDataTypes}
              showActions={showActions}
              showSeaLevelRise={showSeaLevelRise}
              showPollutionDanger={showPollutionDanger}
              showCorrosionRisk={showCorrosionRisk}
              selectedActionTypes={selectedActionTypes}
          />
        </div>
      </div>
  );
};

export default MapPage;
