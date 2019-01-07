from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from goals.models import (
    User, Goal, GoalDay, TimePie, TimeSection
)


class GoalAdmin(admin.ModelAdmin):

    class Meta:
        model = Goal


class GoalDayAdmin(admin.ModelAdmin):
    class Meta:
        model = GoalDay


class TimePieAdmin(admin.ModelAdmin):
    class Meta:
        model = TimePie


class TimeSectionAdmin(admin.ModelAdmin):
    class Meta:
        model = TimeSection


admin.site.register(User, UserAdmin)
admin.site.register(Goal, GoalAdmin)
admin.site.register(GoalDay, GoalDayAdmin)
admin.site.register(TimePie, TimePieAdmin)
admin.site.register(TimeSection, TimeSectionAdmin)
