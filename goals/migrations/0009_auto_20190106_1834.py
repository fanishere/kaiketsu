# Generated by Django 2.1.5 on 2019-01-06 18:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('goals', '0008_auto_20190106_1822'),
    ]

    operations = [
        migrations.AlterField(
            model_name='goalday',
            name='goal',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='days', to='goals.Goal'),
        ),
    ]
