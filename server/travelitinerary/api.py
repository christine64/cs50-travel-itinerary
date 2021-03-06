from travelitinerary.models import Location, Activity, Itinerary, Wishlist, User
from rest_framework import viewsets, permissions
from .serializers import LocationSerializer, ItinerarySerializer, RequestItinerarySerializer, ActivitySerializer, WishlistSerializer, RequestWishlistSerializer, UserSerializer, UserSerializerWithToken

class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = LocationSerializer

class ItineraryViewSet(viewsets.ModelViewSet):
    queryset = Itinerary.objects.filter(owner_id=2)
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ItinerarySerializer

class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.filter(owner_id=2)
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ActivitySerializer

class WishlistViewSet(viewsets.ModelViewSet):
    queryset = Wishlist.objects.filter(owner_id=2)

    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = WishlistSerializer

class RequestWishlistViewSet(viewsets.ModelViewSet):
    queryset = Wishlist.objects.filter(owner_id=2)
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = RequestWishlistSerializer

class RequestItineraryViewSet(viewsets.ModelViewSet):
    queryset = Itinerary.objects.filter(owner_id=2)
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = RequestItinerarySerializer

class CurrentUserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserSerializer

class UserListViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserSerializerWithToken
