from django.urls import path
from . import views

urlpatterns = [
    path("", views.ClimateActionListCreateView.as_view(), name="climate_actions"),
    path("<int:pk>/", views.ClimateActionDetailView.as_view(), name="climate_action_detail"),
    path("<int:action_id>/join/", views.ActionParticipationView.as_view(), name="join_action"),
    path("<int:action_id>/cancel/", views.cancel_participation, name="cancel_participation"),
    path("user/", views.user_actions, name="user_actions"),
    path("map/", views.map_actions, name="map_actions"),
]
