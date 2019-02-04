from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'kaiketsu.settings')

app = Celery('kaiketsu',
             broker='amqp://localhost',
             include=['kaiketsu.tasks'])


app.conf.update(
    BROKER_URL=os.environ['CLOUDAMQP_URL'],
    RESULT_BACKEND=None
    )
app.config_from_object('django.conf:settings', namespace='CELERY')
app.conf.timezone = 'EST'
app.autodiscover_tasks()

# Optional configuration, see the application user guide.
app.conf.update(
    result_expires=3600,
)

if __name__ == '__main__':
    app.start()
