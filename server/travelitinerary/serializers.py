from rest_framework import serializers
from travelitinerary.models import Location, Activity, Itinerary, Wishlist

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        depth = 1
        fields = '__all__'

class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        depth = 1
        fields = '__all__'

class ItinerarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Itinerary
        depth = 1
        fields = '__all__'

class WishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wishlist
        depth = 1
        fields = '__all__'
