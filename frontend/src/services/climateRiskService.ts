import axios from 'axios';

interface ClimateRiskRequest {
  lat: number;
  lng: number;
  locationName?: string;
}

interface ClimateRiskResponse {
  ok: boolean;
  html?: string;
  error?: string;
  details?: any;
}

/**
 * Service to handle climate risk analysis API calls
 */
export class ClimateRiskService {
  // Use Django backend as proxy to ai_thing service - only one server needed!
  private static readonly API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';
  
  /**
   * Get climate risk analysis for given coordinates
   */
  static async getClimateRiskAnalysis(request: ClimateRiskRequest): Promise<ClimateRiskResponse> {
    try {
      const response = await axios.post<ClimateRiskResponse>(
        `${this.API_BASE_URL}/api/climate/climate-risk/`,
        request,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 35000 // 35 second timeout (longer than backend timeout)
        }
      );
      
      return response.data;
    } catch (error) {
      console.error('Climate risk analysis request failed:', error);
      
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as any;
        return {
          ok: false,
          error: axiosError.response?.data?.error || axiosError.message || 'Network error occurred',
          details: axiosError.response?.data?.details
        };
      }
      
      return {
        ok: false,
        error: 'An unexpected error occurred'
      };
    }
  }

  /**
   * Reverse geocode coordinates to get a location name
   */
  static async reverseGeocode(lat: number, lng: number): Promise<string | null> {
    try {
      const url = new URL('https://nominatim.openstreetmap.org/reverse');
      url.searchParams.set('format', 'jsonv2');
      url.searchParams.set('lat', String(lat));
      url.searchParams.set('lon', String(lng));
      url.searchParams.set('zoom', '10');
      url.searchParams.set('addressdetails', '0');

      const response = await axios.get(url.toString(), {
        headers: {
          'Accept': 'application/json'
        },
        timeout: 10000 // 10 second timeout for geocoding
      });

      return (response.data as any)?.display_name || null;
    } catch (error) {
      console.warn('Reverse geocoding failed:', error);
      return null;
    }
  }
}
