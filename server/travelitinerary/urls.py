from rest_framework import routers
from .api import LocationViewSet, ItineraryViewSet, RequestItineraryViewSet, ActivityViewSet, WishlistViewSet, RequestWishlistViewSet, CurrentUserViewSet, UserListViewSet

router = routers.DefaultRouter()
router.register('api/locations', LocationViewSet, 'locations')
router.register('api/itineraries', ItineraryViewSet, 'itineraries')
router.register('api/getitineraries', RequestItineraryViewSet, 'requestitineraries')
router.register('api/activites', ActivityViewSet, 'activites')
router.register('api/wishlist', WishlistViewSet, 'wishlist')
router.register('api/getwishlist', RequestWishlistViewSet, 'requestwishlist')
router.register('api/currentuser', CurrentUserViewSet, 'current_user'),
router.register('api/users', UserListViewSet, 'user_list')

urlpatterns = router.urls