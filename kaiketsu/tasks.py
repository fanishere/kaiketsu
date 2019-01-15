# tasks.py
from __future__ import absolute_import, unicode_literals
from celery.task.schedules import crontab
from kaiketsu.celery import app
from goals.models import Goal


# @app.on_after_configure.connect
# def setup_periodic_tasks(sender, **kwargs):

#     sender.add_periodic_task(
#         5.0,
#         test.s(),
#     )
#     # Executes every night at 11:45 p.m.
#     sender.add_periodic_task(
#         crontab(hour=23, minute=45),
#         make_goal_day_false,
#     )


@app.task
def make_goal_day_false():
    goals = Goal.objects.all()
    for goal in goals:
        goal.log_day_as_false()


app.conf.beat_schedule = {
    'make-false-checks': {
        'task': 'kaiketsu.tasks.make_goal_day_false',
        'schedule': crontab(hour=17, minute=35),
        'args': ()
    },
}
