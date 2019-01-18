from django.core.management.base import BaseCommand, CommandError, models, datetime
from goals.models import User, Goal, DateTime, GoalDay
from datetime import timedelta


class Command(BaseCommand):
    args = ''
    help = 'Loads the initial data in to database'

    def handle(self, *args, **kwargs):
        print('Deleting Database...')

        User.objects.filter(is_superuser=False).delete()

        Goal.objects.all().delete()

        DateTime.objects.all().delete()

        GoalDay.objects.all().delete()

        person = Person()

    def add_arguments(self, parser):
        parser.add_argument('goals', nargs='+', type=int)

        parser.add_argument(
            '--delete',
            action='store_true',
            dest='delete',
            help='Delete goal instead of closing it',
        )

    def generate_User(self, **kwargs):
        USERNAME_FIELD = 'username'

    def generate_Goal(self, **kwargs):
        resolution = models.TextField(null=True)
        reason = models.TextField(null=True)

        DURATION_CHOICES = (
            (timedelta(days=30), 'ONE MONTH'),
            (timedelta(days=90), 'THREE MONTHS'),
        )
        duration = models.DurationField(choices=DURATION_CHOICES, null=True)

        TYPE_CHOICES = (
            ('HEALTH', 'HEALTH'),
            ('PROFESSIONAL', 'PROFESSIONAL'),
            ('PERSONAL', 'PERSONAL'),
        )
        category = models.CharField(
            choices=TYPE_CHOICES, null=True, max_length=20)

        user = models.ForeignKey(
            User,
            on_delete=models.CASCADE,
            null=True,
            related_name='goals'
        )
        active = models.BooleanField(default=True, editable=True)

    def generate_DateTime(self, **kwargs):
        datetime.date.today.return_value = date(2010, 1, 1)

    def generate_GoalDay(self, **kwargs):
        goal_met = models.BooleanField(default=False)
        goal = models.ForeignKey(
            Goal,
            on_delete=models.CASCADE,
            related_name='days'
        )

        class Meta:
            unique_together = ('created_at', 'goal')

    print('All Data Imported Successfully')
