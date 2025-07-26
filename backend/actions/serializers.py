from rest_framework import serializers
from .models import ClimateAction, ActionParticipation, ActionResource, ActionUpdate
from accounts.serializers import UserProfileSerializer


class ClimateActionSerializer(serializers.ModelSerializer):
    organizer_name = serializers.CharField(source="organizer.full_name", read_only=True)
    participant_count = serializers.ReadOnlyField()
    action_type_display = serializers.CharField(source="get_action_type_display", read_only=True)
    status_display = serializers.CharField(source="get_status_display", read_only=True)
    
    class Meta:
        model = ClimateAction
        fields = "__all__"
        read_only_fields = ("organizer", "created_at", "updated_at", "impact_score")


class ClimateActionCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClimateAction
        fields = "__all__"
        read_only_fields = ("organizer", "created_at", "updated_at", "impact_score")
    
    def create(self, validated_data):
        validated_data["organizer"] = self.context["request"].user
        return super().create(validated_data)


class ActionParticipationSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source="user.full_name", read_only=True)
    action_title = serializers.CharField(source="action.title", read_only=True)
    
    class Meta:
        model = ActionParticipation
        fields = "__all__"
        read_only_fields = ("user", "registered_at")


class ActionResourceSerializer(serializers.ModelSerializer):
    created_by_name = serializers.CharField(source="created_by.full_name", read_only=True)
    resource_type_display = serializers.CharField(source="get_resource_type_display", read_only=True)
    
    class Meta:
        model = ActionResource
        fields = "__all__"
        read_only_fields = ("created_by", "created_at", "updated_at")


class ActionUpdateSerializer(serializers.ModelSerializer):
    created_by_name = serializers.CharField(source="created_by.full_name", read_only=True)
    
    class Meta:
        model = ActionUpdate
        fields = "__all__"
        read_only_fields = ("created_by", "created_at")


class ActionDetailSerializer(serializers.ModelSerializer):
    organizer = UserProfileSerializer(read_only=True)
    participants = ActionParticipationSerializer(many=True, read_only=True)
    resources = ActionResourceSerializer(many=True, read_only=True)
    updates = ActionUpdateSerializer(many=True, read_only=True)
    participant_count = serializers.ReadOnlyField()
    action_type_display = serializers.CharField(source="get_action_type_display", read_only=True)
    status_display = serializers.CharField(source="get_status_display", read_only=True)
    
    class Meta:
        model = ClimateAction
        fields = "__all__"
