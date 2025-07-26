from django.db import models
from django.conf import settings
from django.utils import timezone


class ClimateAction(models.Model):
    """Climate action events and initiatives"""
    
    ACTION_TYPES = [
        ("citizen_science", "Citizen Science"),
        ("climate_assembly", "Local Climate Assembly"),
        ("lifestyle_change", "Lifestyle Changes"),
        ("workshop", "Workshop/Event"),
        ("ngo_initiative", "NGO & Community Initiative"),
        ("resource_sharing", "Resource Sharing"),
        ("participatory_budgeting", "Participatory Budgeting"),
        ("hackathon", "Hackathon"),
        ("protest", "Climate Protest"),
        ("seminar", "Educational Seminar"),
    ]
    
    STATUS_CHOICES = [
        ("upcoming", "Upcoming"),
        ("ongoing", "Ongoing"),
        ("completed", "Completed"),
        ("cancelled", "Cancelled"),
    ]
    
    # Basic information
    title = models.CharField(max_length=200)
    description = models.TextField()
    action_type = models.CharField(max_length=30, choices=ACTION_TYPES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="upcoming")
    
    # Location
    location_name = models.CharField(max_length=200)
    latitude = models.FloatField()
    longitude = models.FloatField()
    country = models.CharField(max_length=50)
    city = models.CharField(max_length=100)
    
    # Timing
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Organization
    organizer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="organized_actions")
    organization_name = models.CharField(max_length=200, blank=True)
    contact_email = models.EmailField(blank=True)
    website = models.URLField(blank=True)
    
    # Participation
    max_participants = models.PositiveIntegerField(null=True, blank=True)
    registration_required = models.BooleanField(default=False)
    registration_deadline = models.DateTimeField(null=True, blank=True)
    
    # Content
    image = models.ImageField(upload_to="action_images/", blank=True, null=True)
    tags = models.CharField(max_length=500, blank=True, help_text="Comma-separated tags")
    
    # Impact tracking
    expected_impact = models.TextField(blank=True)
    actual_impact = models.TextField(blank=True)
    impact_score = models.PositiveIntegerField(default=0)
    
    class Meta:
        ordering = ["start_date"]
        verbose_name = "Climate Action"
        verbose_name_plural = "Climate Actions"
    
    def __str__(self):
        return f"{self.title} - {self.start_date.strftime('%Y-%m-%d')}"
    
    @property
    def is_upcoming(self):
        return self.start_date > timezone.now()
    
    @property
    def is_ongoing(self):
        return self.start_date <= timezone.now() <= self.end_date
    
    @property
    def is_completed(self):
        return self.end_date < timezone.now()
    
    @property
    def participant_count(self):
        return self.participants.count()


class ActionParticipation(models.Model):
    """Track user participation in climate actions"""
    
    PARTICIPATION_TYPES = [
        ("registered", "Registered"),
        ("attended", "Attended"),
        ("completed", "Completed"),
        ("cancelled", "Cancelled"),
    ]
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="participations")
    action = models.ForeignKey(ClimateAction, on_delete=models.CASCADE, related_name="participants")
    participation_type = models.CharField(max_length=20, choices=PARTICIPATION_TYPES, default="registered")
    
    # Participation details
    registered_at = models.DateTimeField(auto_now_add=True)
    notes = models.TextField(blank=True)
    rating = models.PositiveIntegerField(null=True, blank=True, help_text="1-5 rating")
    feedback = models.TextField(blank=True)
    
    # Contribution tracking
    contribution_hours = models.FloatField(default=0)
    contribution_description = models.TextField(blank=True)
    
    class Meta:
        unique_together = ("user", "action")
        ordering = ["-registered_at"]
        verbose_name = "Action Participation"
        verbose_name_plural = "Action Participations"
    
    def __str__(self):
        return f"{self.user.full_name} - {self.action.title}"


class ActionResource(models.Model):
    """Resources shared for climate actions"""
    
    RESOURCE_TYPES = [
        ("document", "Document"),
        ("video", "Video"),
        ("link", "External Link"),
        ("tool", "Tool/Software"),
        ("dataset", "Dataset"),
        ("guide", "How-to Guide"),
    ]
    
    action = models.ForeignKey(ClimateAction, on_delete=models.CASCADE, related_name="resources")
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    resource_type = models.CharField(max_length=20, choices=RESOURCE_TYPES)
    
    # Resource location
    file = models.FileField(upload_to="action_resources/", blank=True, null=True)
    external_url = models.URLField(blank=True)
    
    # Metadata
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Action Resource"
        verbose_name_plural = "Action Resources"
    
    def __str__(self):
        return f"{self.title} ({self.action.title})"


class ActionUpdate(models.Model):
    """Updates and announcements for climate actions"""
    
    action = models.ForeignKey(ClimateAction, on_delete=models.CASCADE, related_name="updates")
    title = models.CharField(max_length=200)
    content = models.TextField()
    
    # Metadata
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    is_important = models.BooleanField(default=False)
    
    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Action Update"
        verbose_name_plural = "Action Updates"
    
    def __str__(self):
        return f"{self.title} - {self.action.title}"
