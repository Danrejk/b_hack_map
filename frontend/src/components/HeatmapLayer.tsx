import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat';

interface HeatmapLayerProps {
  data: Array<[number, number, number]>; // [lat, lng, intensity]
  visible: boolean;
}

const HeatmapLayer: React.FC<HeatmapLayerProps> = ({ data, visible }) => {
  const map = useMap();

  useEffect(() => {
    if (!visible || !data.length) return;

    // Create heatmap layer with custom styling
    const heatmapLayer = (L as any).heatLayer(data, {
      radius: 25,
      blur: 15,
      maxZoom: 10,
      max: 1.0,
      minOpacity: 0.4,
      gradient: {
        0.0: '#3b82f6', // blue - low rise
        0.3: '#06b6d4', // cyan - low-medium rise
        0.5: '#10b981', // green - medium rise
        0.7: '#f59e0b', // amber - medium-high rise
        0.9: '#ef4444', // red - high rise
        1.0: '#dc2626'  // dark red - very high rise
      }
    });

    // Add to map
    heatmapLayer.addTo(map);

    // Cleanup function
    return () => {
      map.removeLayer(heatmapLayer);
    };
  }, [map, data, visible]);

  return null; // This component doesn't render anything directly
};

export default HeatmapLayer;
