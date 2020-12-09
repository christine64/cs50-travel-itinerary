# Generated by Django 3.1 on 2020-12-07 05:41

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('travelitinerary', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='itinerary',
            name='owner',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='itineraries', to=settings.AUTH_USER_MODEL),
        ),
    ]