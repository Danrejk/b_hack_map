from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import User, UserActivity, UserAchievement


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    username = serializers.CharField(required=False)
    
    class Meta:
        model = User
        fields = ("email", "username", "first_name", "last_name", "password")
    
    def create(self, validated_data):
        password = validated_data.pop("password")
        
        # Create username from provided username or email
        if "username" not in validated_data or not validated_data["username"]:
            email = validated_data["email"]
            username = email.split("@")[0]
        else:
            username = validated_data["username"]
        
        base_username = username
        counter = 1
        
        # Ensure username is unique
        while User.objects.filter(username=username).exists():
            username = f"{base_username}{counter}"
            counter += 1
        
        validated_data["username"] = username
        user = User.objects.create_user(**validated_data)
        user.set_password(password)
        user.save()
        
        return user


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    
    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")
        
        if email and password:
            user = authenticate(request=self.context.get("request"), username=email, password=password)
            
            if not user:
                raise serializers.ValidationError("Invalid email or password.")
            
            if not user.is_active:
                raise serializers.ValidationError("User account is disabled.")
            
            attrs["user"] = user
            return attrs
        else:
            raise serializers.ValidationError("Must include email and password.")


class UserProfileSerializer(serializers.ModelSerializer):
    full_name = serializers.ReadOnlyField()
    
    class Meta:
        model = User
        fields = (
            "id", "email", "first_name", "last_name", "full_name", 
            "bio", "location", "avatar", "date_joined", "last_activity",
            "actions_joined", "actions_organized", "impact_score",
            "email_notifications", "location_sharing"
        )
        read_only_fields = ("id", "date_joined", "last_activity", "actions_joined", "actions_organized", "impact_score")


class UserActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = UserActivity
        fields = ("date", "action_count", "contribution_level")


class UserAchievementSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAchievement
        fields = ("achievement_type", "name", "description", "icon", "date_earned")


class UserStatsSerializer(serializers.ModelSerializer):
    activities = UserActivitySerializer(many=True, read_only=True)
    achievements = UserAchievementSerializer(many=True, read_only=True)
    
    class Meta:
        model = User
        fields = (
            "id", "full_name", "bio", "location", "avatar",
            "actions_joined", "actions_organized", "impact_score",
            "activities", "achievements"
        )
