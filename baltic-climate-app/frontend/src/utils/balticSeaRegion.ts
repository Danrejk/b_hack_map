// Utility to check if coordinates are within the Baltic Sea region
// This is a simplified bounding box approach, but you could use more precise polygon checking

interface Coordinates {
  lat: number;
  lng: number;
}

// Baltic Sea approximate boundaries
const BALTIC_SEA_BOUNDS = {
  north: 66.0,   // Northern Finland/Sweden
  south: 53.5,   // Northern Poland/Germany
  east: 30.0,    // Eastern Finland/Russia
  west: 9.0      // Western Denmark/Sweden
};

/**
 * Check if given coordinates are within the Baltic Sea region
 */
export const isInBalticSeaRegion = (coordinates: Coordinates): boolean => {
  const { lat, lng } = coordinates;
  
  return (
    lat >= BALTIC_SEA_BOUNDS.south &&
    lat <= BALTIC_SEA_BOUNDS.north &&
    lng >= BALTIC_SEA_BOUNDS.west &&
    lng <= BALTIC_SEA_BOUNDS.east
  );
};

/**
 * Check if coordinates are within a GeoJSON polygon feature
 * More precise than bounding box but requires the GeoJSON data
 */
export const isInBalticSeaPolygon = (
  coordinates: Coordinates, 
  balticGeoJSON: any
): boolean => {
  if (!balticGeoJSON?.features?.length) {
    // Fallback to bounding box if no GeoJSON available
    return isInBalticSeaRegion(coordinates);
  }

  // This is a simplified point-in-polygon check
  // For production, you might want to use a proper geometric library like turf.js
  const feature = balticGeoJSON.features[0];
  if (feature.geometry.type === 'Polygon') {
    return isPointInPolygon(coordinates, feature.geometry.coordinates[0]);
  }
  
  if (feature.geometry.type === 'MultiPolygon') {
    return feature.geometry.coordinates.some((polygon: any) => 
      isPointInPolygon(coordinates, polygon[0])
    );
  }
  
  return isInBalticSeaRegion(coordinates);
};

/**
 * Simple point-in-polygon algorithm (ray casting)
 */
const isPointInPolygon = (point: Coordinates, polygon: [number, number][]): boolean => {
  const { lat, lng } = point;
  let inside = false;
  
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    
    if (((yi > lat) !== (yj > lat)) && 
        (lng < (xj - xi) * (lat - yi) / (yj - yi) + xi)) {
      inside = !inside;
    }
  }
  
  return inside;
};
