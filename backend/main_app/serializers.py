from rest_framework import serializers
from main_app.models import *

class UserSerializer(serializers.ModelSerializer):
   class Meta:
       model = User
       fields = ['id', 'username', 'email', 'date_joined']

class RecipeSerializer(serializers.ModelSerializer):
    owner = UserSerializer(many=False, read_only=True)
    fans = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Recipe
        fields = ['id', 'title', 'description', 'owner', 'uploaded_at', 'fans', 'image']