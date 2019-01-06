from django.db import models
from django.contrib.auth.models import AbstractUser
from datetime import timedelta


class User(AbstractUser):
    USERNAME_FIELD = 'username'


class Timestamp(models.Model):
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        abstract = True


class DateStamp(models.Model):
    created_at = models.DateField(auto_now_add=True, null=True)
    created_time = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        abstract = True


class Goal(DateStamp):
    resolution = models.TextField(null=True)
    reason = models.TextField(null=True)

    DURATION_CHOICES = (
        (timedelta(days=30), 'ONE MONTH'),
        (timedelta(days=90), 'THREE MONTHS'),
    )
    duration = models.DurationField(choices=DURATION_CHOICES, null=True)

    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    active = models.BooleanField(default=True, editable=True)

    # def get_days(self):
        # return days ordered by date


class GoalDay(DateStamp):
    date = models.DateField(auto_now_add=True, null=True)
    goal_met = models.BooleanField(default=False)
    goal = models.ForeignKey(
        Goal,
        on_delete=models.CASCADE,
        related_name='days'
        )

    class Meta:
        unique_together = ('created_at', 'goal')
