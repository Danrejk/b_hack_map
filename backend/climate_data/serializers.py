from rest_framework import serializers
from .models import ClimateDataPoint, ClimateRiskArea, WeatherData


class ClimateDataPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClimateDataPoint
        fields = "__all__"


class ClimateRiskAreaSerializer(serializers.ModelSerializer):
    risk_type_display = serializers.CharField(source="get_risk_type_display", read_only=True)
    risk_level_display = serializers.CharField(source="get_risk_level_display", read_only=True)
    
    class Meta:
        model = ClimateRiskArea
        fields = "__all__"


class WeatherDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeatherData
        fields = "__all__"
