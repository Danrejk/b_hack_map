import { useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { useClimateRiskClick } from '../hooks/useClimateRiskClick';

interface MapClickHandlerProps {
  highlightFeature: any;
}

const MapClickHandler: React.FC<MapClickHandlerProps> = ({ highlightFeature }) => {
  // Store reference to current popup
  let currentPopup: L.Popup | null = null;

  const showPopup = (lat: number, lng: number, content: string) => {
    // Close existing popup if any
    if (currentPopup) {
      currentPopup.remove();
    }
    
    // Create new popup
    currentPopup = L.popup({ maxWidth: 400, minWidth: 250 })
      .setLatLng([lat, lng])
      .setContent(content);
    
    // Add to map
    if (map) {
      currentPopup.openOn(map);
    }
  };

  const { handleMapClick } = useClimateRiskClick({
    highlightFeature,
    onShowPopup: showPopup
  });

  const map = useMapEvents({
    click: handleMapClick,
  });

  return null; // This component doesn't render anything
};

export default MapClickHandler;
