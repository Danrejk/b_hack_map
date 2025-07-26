import { useCallback } from 'react';
import { LeafletMouseEvent } from 'leaflet';
import { ClimateRiskService } from '../services/climateRiskService';
import { isInBalticSeaRegion, isInBalticSeaPolygon } from '../utils/balticSeaRegion';

interface UseClimateRiskClickProps {
  highlightFeature: any;
  onShowPopup: (lat: number, lng: number, content: string) => void;
}

export const useClimateRiskClick = ({ highlightFeature, onShowPopup }: UseClimateRiskClickProps) => {
  
  const handleMapClick = useCallback(async (event: LeafletMouseEvent) => {
    const { lat, lng } = event.latlng;
    
    // Check if the click is within the Baltic Sea region
    const isInBaltic = highlightFeature 
      ? isInBalticSeaPolygon({ lat, lng }, highlightFeature)
      : isInBalticSeaRegion({ lat, lng });
    
    if (!isInBaltic) {
      onShowPopup(
        lat, 
        lng, 
        `<div class="p-2">
          <h4 class="font-medium text-base mb-2">Outside Baltic Sea Region</h4>
          <p class="text-sm text-gray-600">Climate risk analysis is only available for the Baltic Sea region.</p>
        </div>`
      );
      return;
    }

    // Show initial loading popup
    onShowPopup(
      lat, 
      lng, 
      `<div class="p-2">
        <div class="flex items-center space-x-2">
          <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          <span class="font-medium">Analyzing climate risks...</span>
        </div>
        <p class="text-sm text-gray-600 mt-1">${lat.toFixed(4)}, ${lng.toFixed(4)}</p>
      </div>`
    );

    try {
      // Get location name first (best effort)
      const locationName = await ClimateRiskService.reverseGeocode(lat, lng);
      
      // Get climate risk analysis
      const result = await ClimateRiskService.getClimateRiskAnalysis({
        lat,
        lng,
        locationName: locationName || undefined
      });

      if (result.ok && result.html) {
        // Sanitize HTML to prevent XSS
        const safeHtml = result.html
          .replace(/<script/gi, '&lt;script')
          .replace(/<\/script>/gi, '&lt;/script&gt;');
        
        onShowPopup(lat, lng, `<div class="p-2">${safeHtml}</div>`);
      } else {
        onShowPopup(
          lat, 
          lng, 
          `<div class="p-2">
            <h4 class="font-medium text-base mb-2 text-red-600">Analysis Failed</h4>
            <p class="text-sm text-gray-600">${result.error || 'Unable to analyze climate risks at this location.'}</p>
            <p class="text-xs text-gray-500 mt-2">Please try again in a moment.</p>
          </div>`
        );
      }
    } catch (error) {
      console.error('Climate risk analysis error:', error);
      onShowPopup(
        lat, 
        lng, 
        `<div class="p-2">
          <h4 class="font-medium text-base mb-2 text-red-600">Connection Error</h4>
          <p class="text-sm text-gray-600">Unable to connect to the climate analysis service.</p>
          <p class="text-xs text-gray-500 mt-2">Please check your connection and try again.</p>
        </div>`
      );
    }
  }, [highlightFeature, onShowPopup]);

  return {
    handleMapClick
  };
};
