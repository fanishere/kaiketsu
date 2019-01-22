from django.core.management.base import BaseCommand
from goals.models import User, Goal, GoalDay
from datetime import timedelta
from datetime import date


def user1():

    goal_date = date(2018, 6, 10)

    christine = User.objects.create_user(
        username="christine422",
        first_name="Christine",
        email="example@domain.com",
        password="blueblue"
    )

    water_goal = Goal.objects.create(
        resolution="drink 8 glasses of water",
        reason="I want to feel more energetic",
        category="HEALTH",
        duration=timedelta(days=30),
        user=christine,
        active=True,
        created_at=goal_date
    )

    for i in range(28):
        goal_met = True
        if date.day in [2, 5, 10, 20, 1, 12, 7]:
            goal_met = False

        GoalDay.objects.create(
            created_at=goal_date,
            goal=water_goal,
            goal_met=goal_met
        )
        goal_date += timedelta(days=1)

    more_people = Goal.objects.create(
        resolution="talk to someone new",
        reason="I want to get to know more people",
        category="PERSONAL",
        duration=timedelta(days=90),
        user=christine,
        active=True,
        created_at=goal_date
    )

    for i in range(78):
        goal_met = True
        if date.day in [2, 5, 10, 20, 1, 12, 7, 50, 24, 33, 29, 70, 67]:
            goal_met = False

        GoalDay.objects.create(
            created_at=goal_date,
            goal=more_people,
            goal_met=goal_met
        )
        goal_date += timedelta(days=1)

    Goal.objects.create(
        resolution="get into work 30 minutes early",
        reason="it'll help me be more prepared",
        category="PROFESSIONAL",
        duration=timedelta(days=30),
        user=christine,
        active=True,
        created_at=goal_date
    )

    Goal.objects.create(
        resolution="eat more vegetables",
        reason="I hear it's good for me",
        category="HEALTH",
        duration=timedelta(days=10),
        user=christine,
        active=False,
        created_at=goal_date
    )

    Goal.objects.create(
        resolution="skip that starbucks coffee",
        reason="it'll help me save money",
        category="PERSONAL",
        duration=timedelta(days=30),
        user=christine,
        active=False,
        created_at=goal_date
    )


class Command(BaseCommand):
    help = "My shiny new management command."

    def add_arguments(self, parser):
        pass
        # parser.add_argument('sample', nargs='+')

    def handle(self, *args, **options):
        User.objects.filter(is_staff=False).delete()
        Goal.objects.all().delete()
        GoalDay.objects.all().delete()
        user1()
