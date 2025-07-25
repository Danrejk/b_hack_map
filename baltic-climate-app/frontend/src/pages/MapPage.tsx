import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Polygon, GeoJSON } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { Thermometer, Droplets, Wind, AlertTriangle, Calendar, TrendingUp } from 'lucide-react';
import { callForActions } from '../data/callForActions';
import { seaLevelRiseData } from '../data/seaLevelRise';
import CallForActionMarker from '../components/CallForActionMarker';
import HeatmapLayer from '../components/HeatmapLayer';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React-Leaflet
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

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

const balticSeaCenter: LatLngExpression = [59.0, 19.0];

// Bounds covering the entire world for the mask polygon, in [lat, lng]
const MASK_BOUNDS: [number, number][] = [
  [-90, -180],
  [-90, 180],
  [90, 180],
  [90, -180],
  [-90, -180],
];

// Helper for all interior rings
const getMaskPolygon = (featureGeoJSON: any): LatLngExpression[][] | null => {
  if (!featureGeoJSON || !featureGeoJSON.features || !featureGeoJSON.features.length)
    return null;
  const geom = featureGeoJSON.features[0].geometry;
  const outer = MASK_BOUNDS;
  let maskHoles: LatLngExpression[][] = [];

  if (geom.type === 'Polygon') {
    // Each ring in .coordinates is [ [lng,lat], ... ]
    maskHoles = geom.coordinates.map(
        (ring: [number, number][]) => ring.map(([lng, lat]) => [lat, lng])
    );
    // Mask: world as shell, each ring (outer & holes) as holes (exclude all the polygon's areas)
    return [outer, ...maskHoles];
  } else if (geom.type === 'MultiPolygon') {
    // Flatten all rings of all polygons
    maskHoles = geom.coordinates.flat().map(
        (ring: [number, number][]) => ring.map(([lng, lat]) => [lat, lng])
    );
    return [outer, ...maskHoles];
  }
  return null;
};


const MapPage: React.FC = () => {
  const [climateData, setClimateData] = useState<ClimateDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDataTypes, setSelectedDataTypes] = useState<string[]>(['temperature']);
  const [showActions, setShowActions] = useState(true);
  const [showSeaLevelRise, setShowSeaLevelRise] = useState(false);

  const [highlightFeature, setHighlightFeature] = useState<any>(null); // Baltic highlight GeoJSON

  // Normalize sea level rise for heatmap intensity (0-1)
  const normalizeSeaLevelRise = (value: number) => {
    const minValue = 0.1;
    const maxValue = 0.89;
    return Math.min(Math.max((value - minValue) / (maxValue - minValue), 0), 1);
  };

  useEffect(() => {
    fetchClimateData();
  }, []);

  // Load Baltic highlight GeoJSON on mount
  useEffect(() => {
    fetch('baltic_highlight.geojson')
        .then((res) => res.json())
        .then((data) => setHighlightFeature(data))
        .catch((err) =>
            console.error('Failed to load Baltic highlight GeoJSON:', err)
        );
  }, []);


  const fetchClimateData = async () => {
    try {
      // Mock data here, replace with actual fetch call as needed
      const mockData: ClimateDataPoint[] = [
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
          recorded_at: '2024-01-15T10:00:00Z',
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
          recorded_at: '2024-01-15T10:00:00Z',
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
          location_name: 'Gdansk',
          recorded_at: '2024-01-15T10:00:00Z',
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
          recorded_at: '2024-01-15T10:00:00Z',
        },
      ];

      setClimateData(mockData);
    } catch (error) {
      console.error('Failed to fetch climate data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMarkerColor = (dataPoint: ClimateDataPoint, dataType: string) => {
    switch (dataType) {
      case 'temperature':
        if (dataPoint.temperature > 16) return '#ef4444'; // red - hot
        if (dataPoint.temperature > 12) return '#f59e0b'; // yellow - moderate
        return '#3b82f6'; // blue - cold
      case 'humidity':
        if (dataPoint.humidity > 75) return '#1f2937'; // dark gray - high humidity
        if (dataPoint.humidity > 60) return '#6b7280'; // medium gray - moderate
        return '#9ca3af'; // light gray - low humidity
      case 'wind_speed':
        if (dataPoint.wind_speed > 15) return '#000000'; // black - high wind
        if (dataPoint.wind_speed > 10) return '#6b7280'; // gray - moderate wind
        return '#d1d5db'; // light gray - low wind
      default:
        return '#6b7280';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'temperature':
        return <Thermometer className="h-5 w-5" />;
      case 'humidity':
        return <Droplets className="h-5 w-5" />;
      case 'wind_speed':
        return <Wind className="h-5 w-5" />;
      case 'precipitation':
        return <Droplets className="h-5 w-5" />;
      default:
        return <AlertTriangle className="h-5 w-5" />;
    }
  };

  if (loading) {
    return (
        <div className="pt-16 min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
    );
  }

  return (
      <div className="pt-16 min-h-screen bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-light text-black mb-6">Baltic Sea Climate Map</h1>
            <p className="text-lg text-gray-600 mb-8 font-light leading-relaxed">
              Explore real-time climate data across the Baltic Sea region. Select different data types to visualize temperature, humidity, wind patterns, and precipitation.
            </p>

            {/* Data Type Selector */}
            <div className="bg-gray-50 border border-gray-200 p-6">
              <h3 className="text-lg font-light text-black mb-6">Data Visualization</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { key: 'temperature', label: 'Temperature', icon: 'temperature' },
                    { key: 'humidity', label: 'Humidity', icon: 'humidity' },
                    { key: 'wind_speed', label: 'Wind Speed', icon: 'wind_speed' },
                    { key: 'precipitation', label: 'Precipitation', icon: 'precipitation' },
                  ].map((option) => (
                      <button
                          key={option.key}
                          onClick={() => {
                            if (selectedDataTypes.includes(option.key)) {
                              setSelectedDataTypes(selectedDataTypes.filter((type) => type !== option.key));
                            } else {
                              setSelectedDataTypes([...selectedDataTypes, option.key]);
                            }
                          }}
                          className={`flex items-center space-x-2 px-4 py-3 transition-colors font-light ${
                              selectedDataTypes.includes(option.key)
                                  ? 'bg-black text-white'
                                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                          }`}
                      >
                        {getIcon(option.icon)}
                        <span>{option.label}</span>
                      </button>
                  ))}
                </div>

                {/* Actions and Sea Level Rise Toggles */}
                <div className="pt-4 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button
                      onClick={() => setShowActions(!showActions)}
                      className={`flex items-center space-x-2 px-4 py-3 transition-colors font-light ${
                          showActions ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                      }`}
                  >
                    <Calendar className="h-5 w-5" />
                    <span>Environmental Actions</span>
                  </button>

                  <button
                      onClick={() => setShowSeaLevelRise(!showSeaLevelRise)}
                      className={`flex items-center space-x-2 px-4 py-3 transition-colors font-light ${
                          showSeaLevelRise ? 'bg-red-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                      }`}
                  >
                    <TrendingUp className="h-5 w-5" />
                    <span>Sea Level Rise Heatmap</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Map Container */}
          <div className="bg-white border border-gray-200 overflow-hidden">
            <div className="h-[600px] w-full">
              <MapContainer center={balticSeaCenter} zoom={5} className="h-full w-full">
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors & CartoDB'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />


                {/* Baltic Highlight Mask */}
                {highlightFeature && (
                    <Polygon
                        positions={getMaskPolygon(highlightFeature) || []}
                        pathOptions={{ color: 'black', fillColor: 'black', fillOpacity: 0.3, weight: 0 }}
                        interactive={false}
                    />
                )}

                {/* Climate Data Markers */}
                {selectedDataTypes.map((dataType) =>
                    climateData.map((dataPoint) => (
                        <CircleMarker
                            key={`${dataPoint.id}-${dataType}`}
                            center={[dataPoint.latitude, dataPoint.longitude]}
                            radius={12}
                            fillColor={getMarkerColor(dataPoint, dataType)}
                            color="#000000"
                            weight={1}
                            opacity={1}
                            fillOpacity={0.8}
                        >
                          <Popup>
                            <div className="p-2">
                              <h4 className="font-light text-lg mb-2">{dataPoint.location_name}</h4>
                              <div className="space-y-1 text-sm">
                                <div className="flex items-center space-x-2">
                                  <Thermometer className="h-4 w-4 text-gray-600" />
                                  <span className="font-light">Temperature: {dataPoint.temperature}°C</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Droplets className="h-4 w-4 text-gray-600" />
                                  <span className="font-light">Humidity: {dataPoint.humidity}%</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Wind className="h-4 w-4 text-gray-600" />
                                  <span className="font-light">Wind: {dataPoint.wind_speed} km/h</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Droplets className="h-4 w-4 text-gray-600" />
                                  <span className="font-light">Precipitation: {dataPoint.precipitation} mm</span>
                                </div>
                              </div>
                              <div className="mt-2 text-xs text-gray-500 font-light">
                                Last updated: {new Date(dataPoint.recorded_at).toLocaleString()}
                              </div>
                            </div>
                          </Popup>
                        </CircleMarker>
                    ))
                )}

                {/* Call for Action Markers */}
                {showActions &&
                    callForActions.map((action, index) => (
                        <CallForActionMarker key={`action-${action.lat}-${action.lng}-${index}`} action={action} />
                    ))}

                {/* Sea Level Rise Heatmap */}
                <HeatmapLayer
                    data={seaLevelRiseData.map((point) => [
                      point.lat,
                      point.lng,
                      normalizeSeaLevelRise(point.value),
                    ])}
                    visible={showSeaLevelRise}
                />
              </MapContainer>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-8 bg-gray-50 border border-gray-200 p-6">
            <h3 className="text-lg font-light text-black mb-4">
              Map Legend
            </h3>
            
            {/* Climate Data Legends */}
            {selectedDataTypes.map(dataType => (
              <div key={dataType} className="mb-4">
                <h4 className="text-md font-light text-black mb-2">
                  {dataType.charAt(0).toUpperCase() + dataType.slice(1).replace('_', ' ')}
                </h4>
                <div className="flex flex-wrap gap-4">
                  {dataType === 'temperature' && (
                    <>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-red-500"></div>
                        <span className="text-sm font-light">High (&gt; 16°C)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-yellow-500"></div>
                        <span className="text-sm font-light">Moderate (12-16°C)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-blue-500"></div>
                        <span className="text-sm font-light">Low (&lt; 12°C)</span>
                      </div>
                    </>
                  )}
                  {dataType === 'humidity' && (
                    <>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-gray-800"></div>
                        <span className="text-sm font-light">High (&gt; 75%)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-gray-600"></div>
                        <span className="text-sm font-light">Moderate (60-75%)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-gray-400"></div>
                        <span className="text-sm font-light">Low (&lt; 60%)</span>
                      </div>
                    </>
                  )}
                  {dataType === 'wind_speed' && (
                    <>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-black"></div>
                        <span className="text-sm font-light">Strong (&gt; 15 km/h)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-gray-600"></div>
                        <span className="text-sm font-light">Moderate (10-15 km/h)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-gray-300"></div>
                        <span className="text-sm font-light">Light (&lt; 10 km/h)</span>
                      </div>
                    </>
                  )}
                  {dataType === 'precipitation' && (
                    <>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-blue-600"></div>
                        <span className="text-sm font-light">High (&gt; 3mm)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-blue-400"></div>
                        <span className="text-sm font-light">Moderate (1-3mm)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-blue-200"></div>
                        <span className="text-sm font-light">Low (&lt; 1mm)</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}

            {/* Actions Legend */}
            {showActions && (
              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-md font-light text-black mb-2">Environmental Actions</h4>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#ec4899' }}></div>
                    <span className="text-sm font-light">Protests</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#10b981' }}></div>
                    <span className="text-sm font-light">Cleanups</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#3b82f6' }}></div>
                    <span className="text-sm font-light">Workshops</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#f59e0b' }}></div>
                    <span className="text-sm font-light">Seminars</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#8b5cf6' }}></div>
                    <span className="text-sm font-light">Festivals</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#06b6d4' }}></div>
                    <span className="text-sm font-light">Training</span>
                  </div>
                </div>
              </div>
            )}

            {/* Sea Level Rise Heatmap Legend */}
            {showSeaLevelRise && (
              <div className="pt-4 border-t border-gray-200">
                <h4 className="text-md font-light text-black mb-2">Sea Level Rise Heatmap</h4>
                <div className="flex flex-wrap gap-4 mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4" style={{ backgroundColor: '#3b82f6' }}></div>
                    <span className="text-sm font-light">Low (0.1-0.3m)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4" style={{ backgroundColor: '#06b6d4' }}></div>
                    <span className="text-sm font-light">Low-Medium (0.3-0.5m)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4" style={{ backgroundColor: '#10b981' }}></div>
                    <span className="text-sm font-light">Medium (0.5-0.6m)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4" style={{ backgroundColor: '#f59e0b' }}></div>
                    <span className="text-sm font-light">High (0.6-0.8m)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4" style={{ backgroundColor: '#ef4444' }}></div>
                    <span className="text-sm font-light">Very High (0.8-0.9m)</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 font-light">
                  Heatmap showing projected sea level rise across the Baltic Sea region. 
                  Data includes 142 measurement points with rises ranging from 0.1m to 0.89m.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default MapPage;
