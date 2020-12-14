from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass

class Location(models.Model):
    name = models.CharField(max_length=200)

class Activity(models.Model):
    name = models.CharField(max_length=200)
    date = models.DateTimeField(null=True, blank=True)
    price = models.IntegerField(default=0)

class Itinerary(models.Model):
    location = models.ForeignKey("Location", on_delete=models.CASCADE, related_name="itinerary_location")
    start_date = models.DateTimeField(null=True, blank=True)
    end_date = models.DateTimeField(null=True, blank=True)
    activites = models.ManyToManyField(Activity)

class Wishlist(models.Model):
    location = models.ForeignKey("Location", on_delete=models.CASCADE, related_name="wishlist_location")
    itinerary = models.ForeignKey("Itinerary", on_delete=models.CASCADE, related_name="wishlist_itinerary", null=True, blank=True)
