# Generated by Django 5.2 on 2025-07-25 14:59

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="ClimateAction",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=200)),
                ("description", models.TextField()),
                (
                    "action_type",
                    models.CharField(
                        choices=[
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
                        ],
                        max_length=30,
                    ),
                ),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("upcoming", "Upcoming"),
                            ("ongoing", "Ongoing"),
                            ("completed", "Completed"),
                            ("cancelled", "Cancelled"),
                        ],
                        default="upcoming",
                        max_length=20,
                    ),
                ),
                ("location_name", models.CharField(max_length=200)),
                ("latitude", models.FloatField()),
                ("longitude", models.FloatField()),
                ("country", models.CharField(max_length=50)),
                ("city", models.CharField(max_length=100)),
                ("start_date", models.DateTimeField()),
                ("end_date", models.DateTimeField()),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("organization_name", models.CharField(blank=True, max_length=200)),
                ("contact_email", models.EmailField(blank=True, max_length=254)),
                ("website", models.URLField(blank=True)),
                (
                    "max_participants",
                    models.PositiveIntegerField(blank=True, null=True),
                ),
                ("registration_required", models.BooleanField(default=False)),
                ("registration_deadline", models.DateTimeField(blank=True, null=True)),
                (
                    "image",
                    models.ImageField(
                        blank=True, null=True, upload_to="action_images/"
                    ),
                ),
                (
                    "tags",
                    models.CharField(
                        blank=True, help_text="Comma-separated tags", max_length=500
                    ),
                ),
                ("expected_impact", models.TextField(blank=True)),
                ("actual_impact", models.TextField(blank=True)),
                ("impact_score", models.PositiveIntegerField(default=0)),
                (
                    "organizer",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="organized_actions",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "verbose_name": "Climate Action",
                "verbose_name_plural": "Climate Actions",
                "ordering": ["start_date"],
            },
        ),
        migrations.CreateModel(
            name="ActionUpdate",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=200)),
                ("content", models.TextField()),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("is_important", models.BooleanField(default=False)),
                (
                    "created_by",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "action",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="updates",
                        to="actions.climateaction",
                    ),
                ),
            ],
            options={
                "verbose_name": "Action Update",
                "verbose_name_plural": "Action Updates",
                "ordering": ["-created_at"],
            },
        ),
        migrations.CreateModel(
            name="ActionResource",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("title", models.CharField(max_length=200)),
                ("description", models.TextField(blank=True)),
                (
                    "resource_type",
                    models.CharField(
                        choices=[
                            ("document", "Document"),
                            ("video", "Video"),
                            ("link", "External Link"),
                            ("tool", "Tool/Software"),
                            ("dataset", "Dataset"),
                            ("guide", "How-to Guide"),
                        ],
                        max_length=20,
                    ),
                ),
                (
                    "file",
                    models.FileField(
                        blank=True, null=True, upload_to="action_resources/"
                    ),
                ),
                ("external_url", models.URLField(blank=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "created_by",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "action",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="resources",
                        to="actions.climateaction",
                    ),
                ),
            ],
            options={
                "verbose_name": "Action Resource",
                "verbose_name_plural": "Action Resources",
                "ordering": ["-created_at"],
            },
        ),
        migrations.CreateModel(
            name="ActionParticipation",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "participation_type",
                    models.CharField(
                        choices=[
                            ("registered", "Registered"),
                            ("attended", "Attended"),
                            ("completed", "Completed"),
                            ("cancelled", "Cancelled"),
                        ],
                        default="registered",
                        max_length=20,
                    ),
                ),
                ("registered_at", models.DateTimeField(auto_now_add=True)),
                ("notes", models.TextField(blank=True)),
                (
                    "rating",
                    models.PositiveIntegerField(
                        blank=True, help_text="1-5 rating", null=True
                    ),
                ),
                ("feedback", models.TextField(blank=True)),
                ("contribution_hours", models.FloatField(default=0)),
                ("contribution_description", models.TextField(blank=True)),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="participations",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "action",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="participants",
                        to="actions.climateaction",
                    ),
                ),
            ],
            options={
                "verbose_name": "Action Participation",
                "verbose_name_plural": "Action Participations",
                "ordering": ["-registered_at"],
                "unique_together": {("user", "action")},
            },
        ),
    ]
