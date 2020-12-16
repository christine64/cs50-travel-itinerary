from rest_framework import serializers
from travelitinerary.models import Location, Activity, Itinerary, Wishlist, User
from rest_framework_jwt.settings import api_settings

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

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class UserSerializerWithToken(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = '__all__'