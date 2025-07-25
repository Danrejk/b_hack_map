from django.db import models


class ClimateDataPoint(models.Model):
    """Stores climate data points for visualization on the map"""
    
    RISK_LEVELS = [
        ("low", "Low"),
        ("medium", "Medium"),
        ("high", "High"),
    ]
    
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    
    # Geographic data
    latitude = models.FloatField()
    longitude = models.FloatField()
    country = models.CharField(max_length=50)
    region = models.CharField(max_length=100, blank=True)
    
    # Climate risk data
    sea_level_rise = models.FloatField(help_text="Projected sea level rise in meters")
    temperature_increase = models.FloatField(help_text="Average temperature increase in Celsius")
    erosion_risk = models.CharField(max_length=10, choices=RISK_LEVELS, default="low")
    flood_risk = models.CharField(max_length=10, choices=RISK_LEVELS, default="low")
    
    # Metadata
    data_source = models.CharField(max_length=200, blank=True)
    last_updated = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ["name"]
        verbose_name = "Climate Data Point"
        verbose_name_plural = "Climate Data Points"
    
    def __str__(self):
        return f"{self.name} ({self.country})"


class ClimateRiskArea(models.Model):
    """Defines areas with specific climate risks for polygon overlays"""
    
    RISK_TYPES = [
        ("flooding", "Flooding"),
        ("erosion", "Coastal Erosion"),
        ("heat", "Heat Stress"),
        ("sea_level", "Sea Level Rise"),
    ]
    
    name = models.CharField(max_length=100)
    risk_type = models.CharField(max_length=20, choices=RISK_TYPES)
    risk_level = models.CharField(max_length=10, choices=ClimateDataPoint.RISK_LEVELS)
    
    # Geographic data (simplified - in production you'd use PostGIS)
    center_latitude = models.FloatField()
    center_longitude = models.FloatField()
    radius_km = models.FloatField(help_text="Approximate radius in kilometers")
    
    # Risk data
    description = models.TextField()
    impact_assessment = models.TextField(blank=True)
    adaptation_measures = models.TextField(blank=True)
    
    # Metadata
    data_source = models.CharField(max_length=200, blank=True)
    last_updated = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ["name"]
        verbose_name = "Climate Risk Area"
        verbose_name_plural = "Climate Risk Areas"
    
    def __str__(self):
        return f"{self.name} - {self.get_risk_type_display()}"


class WeatherData(models.Model):
    """Historical and forecast weather data"""
    
    location = models.CharField(max_length=100)
    latitude = models.FloatField()
    longitude = models.FloatField()
    
    # Weather data
    date = models.DateField()
    temperature_max = models.FloatField(null=True, blank=True)
    temperature_min = models.FloatField(null=True, blank=True)
    precipitation = models.FloatField(null=True, blank=True, help_text="Precipitation in mm")
    wind_speed = models.FloatField(null=True, blank=True, help_text="Wind speed in m/s")
    humidity = models.FloatField(null=True, blank=True, help_text="Humidity percentage")
    
    # Data type
    is_forecast = models.BooleanField(default=False)
    
    # Metadata
    data_source = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = ("location", "date", "is_forecast")
        ordering = ["-date"]
        verbose_name = "Weather Data"
        verbose_name_plural = "Weather Data"
    
    def __str__(self):
        return f"{self.location} - {self.date}"
