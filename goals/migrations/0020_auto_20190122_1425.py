# Generated by Django 2.1.5 on 2019-01-22 19:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('goals', '0019_auto_20190122_1311'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='goal',
            name='created_time',
        ),
        migrations.RemoveField(
            model_name='goalday',
            name='created_time',
        ),
        migrations.AlterField(
            model_name='goal',
            name='created_at',
            field=models.DateField(auto_now_add=True, null=True),
        ),
        migrations.AlterField(
            model_name='goalday',
            name='created_at',
            field=models.DateField(auto_now_add=True, null=True),
        ),
    ]
