from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    path("register/", views.RegisterView.as_view(), name="register"),
    path("login/", views.login_view, name="login"),
    path("refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("user/", views.UserProfileView.as_view(), name="user_profile"),
    path("stats/", views.UserStatsView.as_view(), name="user_stats"),
    path("activities/", views.user_activities_view, name="user_activities"),
]
