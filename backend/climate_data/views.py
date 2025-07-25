from rest_framework import generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
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
