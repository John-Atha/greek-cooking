from rest_framework import serializers
from main_app.models import *

class UserSerializer(serializers.ModelSerializer):
    recipes = serializers.SerializerMethodField()

    class Meta:
       model = User
       fields = ['id', 'username', 'email', 'date_joined', 'recipes']
    
    def get_recipes(self, user):
        return user.recipes.count()

class RecipeSerializer(serializers.ModelSerializer):
    owner = UserSerializer(many=False, read_only=True)
    fans = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Recipe
        fields = ['id', 'title', 'description', 'owner', 'uploaded_at', 'fans', 'image']

class RecipeBriefSerializer(serializers.ModelSerializer):
    owner = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    fans = serializers.SerializerMethodField()
    class Meta:
        model = Recipe
        fields = ['id', 'title', 'description', 'owner', 'uploaded_at', 'fans']

    def get_owner(self, recipe):
        owner = recipe.owner
        return {
            'id': owner.id,
            'username': owner.username,
        }
    
    def get_description(self, recipe):
        description = recipe.description
        return f"{description[:20]}..."
    
    def get_fans(self, recipe):
        return recipe.fans.count()