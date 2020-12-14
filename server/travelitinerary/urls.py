from rest_framework import routers
from .api import LocationViewSet, ItineraryViewSet, ActivityViewSet, WishlistViewSet, RequestWishlistViewSet

router = routers.DefaultRouter()
router.register('api/locations', LocationViewSet, 'locations')
router.register('api/itineraries', ItineraryViewSet, 'itineraries')
router.register('api/activites', ActivityViewSet, 'activites')
router.register('api/wishlist', WishlistViewSet, 'wishlist')
router.register('api/getwishlist', RequestWishlistViewSet, 'requestwishlist')

urlpatterns = router.urls