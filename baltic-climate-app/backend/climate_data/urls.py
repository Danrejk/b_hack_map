from django.urls import path
from . import views

urlpatterns = [
    path("points/", views.ClimateDataPointListView.as_view(), name="climate_data_points"),
    path("risk-areas/", views.ClimateRiskAreaListView.as_view(), name="climate_risk_areas"),
    path("weather/", views.WeatherDataListView.as_view(), name="weather_data"),
    path("map-data/", views.map_data_view, name="map_data"),
    path("climate-risk/", views.climate_risk_analysis, name="climate_risk_analysis"),
]
