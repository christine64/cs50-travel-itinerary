from travelitinerary.models import Location, Activity, Itinerary, Wishlist
from rest_framework import viewsets, permissions
from .serializers import LocationSerializer, ItinerarySerializer, ActivitySerializer, WishlistSerializer

class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = LocationSerializer

class ItineraryViewSet(viewsets.ModelViewSet):
    queryset = Itinerary.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ItinerarySerializer

class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ActivitySerializer

class WishlistViewSet(viewsets.ModelViewSet):
    queryset = Wishlist.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = WishlistSerializer