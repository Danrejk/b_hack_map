import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import L from 'leaflet';
import { callForActions, CallForAction } from '../data/callForActions';
import CallForActionMarker from './CallForActionMarker';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React-Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

interface CallForActionMapProps {
  height?: string;
  selectedType?: string;
  searchTerm?: string;
}

const CallForActionMap: React.FC<CallForActionMapProps> = ({ 
  height = '500px', 
  selectedType = 'all',
  searchTerm = ''
}) => {
  // Center the map on Central Europe (where most events are located)
  const mapCenter: LatLngExpression = [51.5, 10.0];

  // Filter actions based on type and search term
  const filteredActions = callForActions.filter(action => {
    const matchesType = selectedType === 'all' || action.type.toLowerCase() === selectedType.toLowerCase();
    const matchesSearch = !searchTerm || 
      action.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      action.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      action.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesType && matchesSearch;
  });

  return (
    <div style={{ height, width: '100%' }}>
      <MapContainer
        center={mapCenter}
        zoom={6}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors & <a href="https://carto.com/attributions">CARTO</a>'
        />
        
        {filteredActions.map((action, index) => (
          <CallForActionMarker
            key={`${action.lat}-${action.lng}-${index}`}
            action={action}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default CallForActionMap;
