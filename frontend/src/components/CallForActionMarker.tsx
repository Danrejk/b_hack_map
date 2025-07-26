import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import { CallForAction } from '../data/callForActions';

interface CallForActionMarkerProps {
  action: CallForAction;
  actionIndex: number;
}

const CallForActionMarker: React.FC<CallForActionMarkerProps> = ({ action, actionIndex }) => {
  const position: LatLngExpression = [action.lat, action.lng];
  const navigate = useNavigate();

  // Function to get marker color based on action type
  const getMarkerColor = (type: string): string => {
    switch (type.toLowerCase()) {
      case 'protest':   return '#793a42';
      case 'cleanup':   return '#97988a';
      case 'workshop':  return '#bd6f48';
      case 'seminar':   return '#0b2943';
      case 'virtual':  return '#9198ab';
      case 'training':  return '#b6883b';
      case 'science':   return '#3f4b35';
      default:          return '#ffffff';
    }
  };

  // Create custom icon
  const customIcon = L.divIcon({
    className: 'custom-marker',
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -8],
    html: `
      <div style="
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: ${getMarkerColor(action.type)};
        border: 3px solid #fff;
        box-shadow: 0 0 0 2px #000;
        cursor: pointer;
      "></div>
    `
  });

  // Format dates for display
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDateRange = (): string => {
    const startDate = formatDate(action.dateStart);
    const endDate = formatDate(action.dateEnd);
    
    if (action.dateStart === action.dateEnd) {
      return startDate;
    }
    return `${startDate} - ${endDate}`;
  };

  const handleReadMore = () => {
    navigate(`/action/${actionIndex + 1}`);
  };

  return (
    <Marker position={position} icon={customIcon}>
      <Popup className="custom-popup" maxWidth={300}>
        <div className="p-0 min-w-[280px]">
          
          {/* Content */}
          <div className="px-1">
            <div className="font-bold text-lg mb-1 text-gray-900">
              {action.name}
            </div>
            
            <div className="text-sm text-gray-600 mb-2 capitalize">
              {action.type}
            </div>

            {/* Image if available */}
            {action.image && (
                <div
                    className="w-full h-40 bg-cover bg-center mb-3 rounded-t"
                    style={{ backgroundImage: `url(${action.image})` }}
                />
            )}
            
            <div className="text-sm text-gray-500 mb-1">
              Organized by {action.organizer}
            </div>
            
            <div className="text-xs text-gray-400 mb-3">
              {getDateRange()}
            </div>
            
            <div className="text-sm text-gray-700 mb-4 leading-relaxed">
              {action.description}
            </div>
            
            <button
              onClick={handleReadMore}
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded transition-colors cursor-pointer border-none"
            >
              READ MORE
            </button>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default CallForActionMarker;
