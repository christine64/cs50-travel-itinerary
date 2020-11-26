from rest_framework import routers
from .api import LocationViewSet, ItineraryViewSet, ActivityViewSet, WishlistViewSet

router = routers.DefaultRouter()
router.register('api/locations', LocationViewSet, 'locations')
router.register('api/itineraries', ItineraryViewSet, 'itineraries')
router.register('api/activites', ActivityViewSet, 'activites')
router.register('api/wishlist', WishlistViewSet, 'wishlist')

urlpatterns = router.urls