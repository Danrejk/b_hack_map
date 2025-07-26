from rest_framework import generics, status, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import User, UserActivity
from .serializers import (
    UserRegistrationSerializer,
    UserLoginSerializer,
    UserProfileSerializer,
    UserStatsSerializer
)


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        
        return Response({
            "user": UserProfileSerializer(user).data,
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        }, status=status.HTTP_201_CREATED)


@api_view(["POST"])
@permission_classes([permissions.AllowAny])
def login_view(request):
    serializer = UserLoginSerializer(data=request.data, context={"request": request})
    serializer.is_valid(raise_exception=True)
    
    user = serializer.validated_data["user"]
    refresh = RefreshToken.for_user(user)
    
    return Response({
        "user": UserProfileSerializer(user).data,
        "access": str(refresh.access_token),
        "refresh": str(refresh),
    })


class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        return self.request.user


class UserStatsView(generics.RetrieveAPIView):
    serializer_class = UserStatsSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        return self.request.user


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def user_activities_view(request):
    """Get user activity data for contribution graph"""
    user = request.user
    
    # Get activities for the last year
    from datetime import date, timedelta
    one_year_ago = date.today() - timedelta(days=365)
    
    activities = UserActivity.objects.filter(
        user=user,
        date__gte=one_year_ago
    ).order_by("date")
    
    # Create a complete dataset with all dates
    activity_data = []
    current_date = one_year_ago
    activity_dict = {activity.date: activity for activity in activities}
    
    while current_date <= date.today():
        activity = activity_dict.get(current_date)
        activity_data.append({
            "date": current_date.isoformat(),
            "action_count": activity.action_count if activity else 0,
            "contribution_level": activity.contribution_level if activity else 0,
        })
        current_date += timedelta(days=1)
    
    return Response(activity_data)
