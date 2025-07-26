from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
import requests
import os
import json
from django.conf import settings
from decouple import config
from .models import ClimateDataPoint, ClimateRiskArea, WeatherData
from .serializers import (
    ClimateDataPointSerializer,
    ClimateRiskAreaSerializer,
    WeatherDataSerializer
)


class ClimateDataPointListView(generics.ListAPIView):
    queryset = ClimateDataPoint.objects.all()
    serializer_class = ClimateDataPointSerializer
    permission_classes = [permissions.IsAuthenticated]


class ClimateRiskAreaListView(generics.ListAPIView):
    queryset = ClimateRiskArea.objects.all()
    serializer_class = ClimateRiskAreaSerializer
    permission_classes = [permissions.IsAuthenticated]


class WeatherDataListView(generics.ListAPIView):
    queryset = WeatherData.objects.all()
    serializer_class = WeatherDataSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        location = self.request.query_params.get("location")
        is_forecast = self.request.query_params.get("forecast")
        
        if location:
            queryset = queryset.filter(location__icontains=location)
        
        if is_forecast is not None:
            queryset = queryset.filter(is_forecast=is_forecast.lower() == "true")
        
        return queryset


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def map_data_view(request):
    """Get all data needed for map visualization"""
    
    climate_points = ClimateDataPoint.objects.all()
    risk_areas = ClimateRiskArea.objects.all()
    
    # Organize data by type for frontend
    data = {
        "climate_points": ClimateDataPointSerializer(climate_points, many=True).data,
        "risk_areas": ClimateRiskAreaSerializer(risk_areas, many=True).data,
        "layers": {
            "sea_level": [point for point in ClimateDataPointSerializer(climate_points, many=True).data],
            "temperature": [point for point in ClimateDataPointSerializer(climate_points, many=True).data],
            "erosion": [area for area in ClimateRiskAreaSerializer(risk_areas, many=True).data if area["risk_type"] == "erosion"],
            "flooding": [area for area in ClimateRiskAreaSerializer(risk_areas, many=True).data if area["risk_type"] == "flooding"],
        }
    }
    
    return Response(data)


@api_view(["POST"])
@permission_classes([permissions.AllowAny])
def climate_risk_analysis(request):
    """Climate risk analysis using Google Gemini API directly"""
    
    try:
        # Get coordinates from request
        lat = request.data.get('lat')
        lng = request.data.get('lng')
        location_name = request.data.get('locationName')
        
        if lat is None or lng is None:
            return Response(
                {"ok": False, "error": "lat and lng are required"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not isinstance(lat, (int, float)) or not isinstance(lng, (int, float)):
            return Response(
                {"ok": False, "error": "lat and lng must be numbers"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Check if coordinates are in Baltic Sea region (simplified bounds check)
        baltic_bounds = {
            'north': 66.0,
            'south': 53.5,
            'east': 30.0,
            'west': 9.0
        }
        
        if not (baltic_bounds['south'] <= lat <= baltic_bounds['north'] and 
                baltic_bounds['west'] <= lng <= baltic_bounds['east']):
            return Response({
                "ok": False, 
                "error": "Climate risk analysis is only available for the Baltic Sea region"
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Get Gemini API key
        gemini_api_key = config('GEMINI_API_KEY', default=None)
        
        if not gemini_api_key:
            return Response({
                "ok": False,
                "error": "Gemini API key not configured"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        # Check if mock mode is enabled
        mock_mode = config('MOCK', default='0') == '1'
        
        if mock_mode:
            coords = f"{lat:.4f}, {lng:.4f}"
            location_text = f" ({location_name})" if location_name else ""
            mock_html = f"""<h4>Climate risk snapshot (mock)</h4>
                           <ul><li>Coords: {coords}{location_text}</li>
                           <li>Heat: elevated summers</li>
                           <li>Flooding: check local maps</li></ul>
                           <p style="font-size:0.9em;opacity:0.8;">Not a substitute for official assessments.</p>"""
            return Response({"ok": True, "html": mock_html})
        
        # Prepare the prompt for Gemini
        coords = f"{lat:.4f}, {lng:.4f}"
        place = f" ({location_name})" if location_name else ""
        
        instructions = "You are a climate risk analyst. Write concise, non-alarmist risk scans suitable for a small map popup."
        input_text = f"""Evaluate key climate-related risks for the area around {coords}{place}.
Touch on: heat stress, flooding (river/coastal), wildfire, drought, storms; mention time horizons (2030s, 2050s).
Return ONLY a raw HTML fragment (no Markdown, no code fences, no backticks).:
<h4>Climate risk snapshot</h4>
<ul><li>…</li></ul>"""
        
        # Call Gemini API
        try:
            gemini_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent"
            
            headers = {
                'Content-Type': 'application/json',
            }
            
            data = {
                "contents": [{
                    "parts": [{
                        "text": f"{instructions}\n\n{input_text}"
                    }]
                }],
                "generationConfig": {
                    "temperature": 0.7,
                    "topK": 40,
                    "topP": 0.95,
                    "maxOutputTokens": 1024,
                }
            }
            
            response = requests.post(
                f"{gemini_url}?key={gemini_api_key}",
                headers=headers,
                json=data,
                timeout=30
            )
            
            if response.status_code == 200:
                result = response.json()
                
                # Extract text from Gemini response
                if 'candidates' in result and len(result['candidates']) > 0:
                    candidate = result['candidates'][0]
                    if 'content' in candidate and 'parts' in candidate['content']:
                        text_content = candidate['content']['parts'][0].get('text', 'No response')
                        return Response({"ok": True, "html": text_content})
                
                return Response({
                    "ok": False,
                    "error": "Invalid response format from Gemini API"
                }, status=status.HTTP_502_BAD_GATEWAY)
            
            else:
                error_text = response.text[:500] if response.text else "Unknown error"
                return Response({
                    "ok": False,
                    "error": f"Gemini API returned status {response.status_code}",
                    "details": error_text
                }, status=status.HTTP_502_BAD_GATEWAY)
                
        except requests.exceptions.Timeout:
            return Response({
                "ok": False,
                "error": "Gemini API request timed out"
            }, status=status.HTTP_504_GATEWAY_TIMEOUT)
            
        except requests.exceptions.ConnectionError:
            return Response({
                "ok": False,
                "error": "Unable to connect to Gemini API"
            }, status=status.HTTP_502_BAD_GATEWAY)
            
        except requests.exceptions.RequestException as e:
            return Response({
                "ok": False,
                "error": f"Gemini API request failed: {str(e)}"
            }, status=status.HTTP_502_BAD_GATEWAY)
    
    except Exception as e:
        return Response({
            "ok": False,
            "error": f"Internal server error: {str(e)}"
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
