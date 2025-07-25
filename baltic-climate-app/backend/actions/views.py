from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.utils import timezone
from django.db import models
from .models import ClimateAction, ActionParticipation, ActionResource, ActionUpdate
from .serializers import (
    ClimateActionSerializer,
    ClimateActionCreateSerializer,
    ActionDetailSerializer,
    ActionParticipationSerializer,
    ActionResourceSerializer,
    ActionUpdateSerializer
)


class ClimateActionListCreateView(generics.ListCreateAPIView):
    queryset = ClimateAction.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    
    def get_serializer_class(self):
        if self.request.method == "POST":
            return ClimateActionCreateSerializer
        return ClimateActionSerializer
    
    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filter by action type
        action_type = self.request.query_params.get("type")
        if action_type:
            queryset = queryset.filter(action_type=action_type)
        
        # Filter by status
        status_filter = self.request.query_params.get("status")
        if status_filter:
            queryset = queryset.filter(status=status_filter)
        
        # Filter by location
        location = self.request.query_params.get("location")
        if location:
            queryset = queryset.filter(
                models.Q(city__icontains=location) | 
                models.Q(country__icontains=location)
            )
        
        # Filter upcoming events
        upcoming = self.request.query_params.get("upcoming")
        if upcoming == "true":
            queryset = queryset.filter(start_date__gt=timezone.now())
        
        return queryset.order_by("start_date")


class ClimateActionDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ClimateAction.objects.all()
    serializer_class = ActionDetailSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_permissions(self):
        if self.request.method in ["PUT", "PATCH", "DELETE"]:
            return [permissions.IsAuthenticated(), IsOrganizerOrReadOnly()]
        return [permissions.IsAuthenticated()]


class ActionParticipationView(generics.CreateAPIView):
    serializer_class = ActionParticipationSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def create(self, request, *args, **kwargs):
        action_id = kwargs.get("action_id")
        
        try:
            action = ClimateAction.objects.get(id=action_id)
        except ClimateAction.DoesNotExist:
            return Response({"error": "Action not found"}, status=status.HTTP_404_NOT_FOUND)
        
        # Check if user is already registered
        if ActionParticipation.objects.filter(user=request.user, action=action).exists():
            return Response({"error": "Already registered for this action"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if action is full
        if action.max_participants and action.participant_count >= action.max_participants:
            return Response({"error": "Action is full"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Check registration deadline
        if action.registration_deadline and timezone.now() > action.registration_deadline:
            return Response({"error": "Registration deadline has passed"}, status=status.HTTP_400_BAD_REQUEST)
        
        participation = ActionParticipation.objects.create(
            user=request.user,
            action=action,
            participation_type="registered"
        )
        
        serializer = self.get_serializer(participation)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(["DELETE"])
@permission_classes([permissions.IsAuthenticated])
def cancel_participation(request, action_id):
    """Cancel user participation in an action"""
    try:
        action = ClimateAction.objects.get(id=action_id)
        participation = ActionParticipation.objects.get(user=request.user, action=action)
        participation.delete()
        return Response({"message": "Participation cancelled"}, status=status.HTTP_200_OK)
    except (ClimateAction.DoesNotExist, ActionParticipation.DoesNotExist):
        return Response({"error": "Participation not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def user_actions(request):
    """Get actions organized by or participated in by the user"""
    user = request.user
    
    organized = ClimateAction.objects.filter(organizer=user)
    participated = ClimateAction.objects.filter(participants__user=user)
    
    data = {
        "organized": ClimateActionSerializer(organized, many=True).data,
        "participated": ClimateActionSerializer(participated, many=True).data,
    }
    
    return Response(data)


@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def map_actions(request):
    """Get actions for map visualization"""
    actions = ClimateAction.objects.filter(status__in=["upcoming", "ongoing"])
    
    # Format for map display
    map_data = []
    for action in actions:
        map_data.append({
            "id": action.id,
            "title": action.title,
            "type": action.action_type,
            "type_display": action.get_action_type_display(),
            "latitude": action.latitude,
            "longitude": action.longitude,
            "start_date": action.start_date.isoformat(),
            "end_date": action.end_date.isoformat(),
            "location_name": action.location_name,
            "organizer": action.organizer.full_name,
            "participant_count": action.participant_count,
            "max_participants": action.max_participants,
        })
    
    return Response(map_data)


# Custom permission class
class IsOrganizerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.organizer == request.user
