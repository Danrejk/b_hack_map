from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone


class User(AbstractUser):
    """Custom User model with additional fields for climate activism tracking"""
    
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    bio = models.TextField(max_length=500, blank=True)
    location = models.CharField(max_length=100, blank=True)
    avatar = models.ImageField(upload_to="avatars/", blank=True, null=True)
    
    # Activity tracking
    date_joined = models.DateTimeField(default=timezone.now)
    last_activity = models.DateTimeField(auto_now=True)
    
    # Climate activism stats
    actions_joined = models.PositiveIntegerField(default=0)
    actions_organized = models.PositiveIntegerField(default=0)
    impact_score = models.PositiveIntegerField(default=0)
    
    # Preferences
    email_notifications = models.BooleanField(default=True)
    location_sharing = models.BooleanField(default=True)
    
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "first_name", "last_name"]
    
    class Meta:
        db_table = "auth_user"
        verbose_name = "User"
        verbose_name_plural = "Users"
    
    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.email})"
    
    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"


class UserActivity(models.Model):
    """Track daily user activities for contribution graph"""
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="activities")
    date = models.DateField()
    action_count = models.PositiveIntegerField(default=0)
    contribution_level = models.PositiveIntegerField(default=0, help_text="0-4 level for contribution intensity")
    
    class Meta:
        unique_together = ("user", "date")
        ordering = ["-date"]
        verbose_name = "User Activity"
        verbose_name_plural = "User Activities"
    
    def __str__(self):
        return f"{self.user.full_name} - {self.date} ({self.action_count} actions)"


class UserAchievement(models.Model):
    """Track user achievements in climate activism"""
    
    ACHIEVEMENT_TYPES = [
        ("climate_champion", "Climate Champion"),
        ("community_builder", "Community Builder"),
        ("citizen_scientist", "Citizen Scientist"),
        ("organizer", "Event Organizer"),
        ("mentor", "Mentor"),
        ("advocate", "Climate Advocate"),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="achievements")
    achievement_type = models.CharField(max_length=50, choices=ACHIEVEMENT_TYPES)
    name = models.CharField(max_length=100)
    description = models.TextField(max_length=200)
    icon = models.CharField(max_length=10, default="🏆")  # Emoji icon
    date_earned = models.DateTimeField(default=timezone.now)
    
    class Meta:
        unique_together = ("user", "achievement_type")
        ordering = ["-date_earned"]
        verbose_name = "User Achievement"
        verbose_name_plural = "User Achievements"
    
    def __str__(self):
        return f"{self.user.full_name} - {self.name}"
