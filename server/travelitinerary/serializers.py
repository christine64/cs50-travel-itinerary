from rest_framework import serializers
from .models import TravelItinerary

class TravelItinerarySerializer(serializers.ModelSerializer):
  class Meta:
    model = TravelItinerary
    fields = ('id')