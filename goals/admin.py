from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from goals.models import User, Goal, GoalDay


class GoalAdmin(admin.ModelAdmin):

    class Meta:
        model = Goal


class GoalDayAdmin(admin.ModelAdmin):
    class Meta:
        model = GoalDay


admin.site.register(User, UserAdmin)
admin.site.register(Goal, GoalAdmin)
admin.site.register(GoalDay, GoalDayAdmin)
