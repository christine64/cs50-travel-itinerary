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
    id = serializers.IntegerField(read_only=True)
    location = serializers.PrimaryKeyRelatedField(
        many=False,
        queryset=Location.objects.all()
    )

    itinerary = serializers.PrimaryKeyRelatedField(
        many=False,
        queryset=Itinerary.objects.all(),
        required=False
    )

    def create(self, validated_data):
        return Wishlist.objects.create(**validated_data)

    class Meta:
        model = Wishlist
        fields = ('id', 'location', 'itinerary')

class RequestWishlistSerializer(serializers.ModelSerializer):
    location = LocationSerializer(read_only=True)
    itinerary = ItinerarySerializer(read_only=True)

    class Meta:
        model = Wishlist
        depth = 1
        fields = '__all__'