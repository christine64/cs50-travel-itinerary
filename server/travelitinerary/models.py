from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass

class Location(models.Model):
    name = models.CharField(max_length=200)
    owner = models.ForeignKey("User", on_delete=models.CASCADE, related_name="user_location", null=True, blank=True)

class Activity(models.Model):
    name = models.CharField(max_length=200)
    date = models.DateTimeField(null=True, blank=True)
    price = models.IntegerField(default=0)
    owner = models.ForeignKey("User", on_delete=models.CASCADE, related_name="user_activity", null=True, blank=True)

class Itinerary(models.Model):
    location = models.ForeignKey("Location", on_delete=models.CASCADE, related_name="itinerary_location")
    start_date = models.DateTimeField(null=True, blank=True)
    end_date = models.DateTimeField(null=True, blank=True)
    activites = models.ManyToManyField(Activity)
    owner = models.ForeignKey("User", on_delete=models.CASCADE, related_name="user_itinerary", null=True, blank=True)

class Wishlist(models.Model):
    location = models.ForeignKey("Location", on_delete=models.CASCADE, related_name="wishlist_location")
    itinerary = models.ForeignKey("Itinerary", on_delete=models.CASCADE, related_name="wishlist_itinerary", null=True, blank=True)
    owner = models.ForeignKey("User", on_delete=models.CASCADE, related_name="user_wishlist", null=True, blank=True)
