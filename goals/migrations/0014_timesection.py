# Generated by Django 2.1.5 on 2019-01-07 01:17

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('goals', '0013_timepie'),
    ]

    operations = [
        migrations.CreateModel(
            name='TimeSection',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('percent', models.DecimalField(decimal_places=2, max_digits=2)),
                ('timepie', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='goals.TimePie')),
            ],
        ),
    ]
