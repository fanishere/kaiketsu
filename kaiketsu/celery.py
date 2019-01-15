from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'kaiketsu.settings')

app = Celery('kaiketsu',
             broker='amqp://localhost',
             backend='amqp://',
             include=['kaiketsu.tasks'])


# app.conf.update(BROKER_URL=os.environ['CLOUDAMQP_URL'])
app.conf.update(BROKER_URL='amqp://fvlvtgys:6ZWARtqpCOZYK-NpMKlFhl_ur3hlEcbk@hornet.rmq.cloudamqp.com/fvlvtgys')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()

# Optional configuration, see the application user guide.
app.conf.update(
    result_expires=3600,
)

if __name__ == '__main__':
    app.start()
