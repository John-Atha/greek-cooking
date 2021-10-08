from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('login', TokenObtainPairView.as_view(), name='login'),
    path('token_refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('users', Users.as_view(), name='Users'),
    path('users/<int:id>', OneUser.as_view(), name='User'),
    path('recipes', Recipes.as_view(), name='Recipes'),
    path('recipes/<int:id>', OneRecipe.as_view(), name='Recipe'),
    path('users/<int:id>/recipes', UserRecipes.as_view(), name='User-Recipes'),
    path('users/<int:id>/favourites', UserFavourites.as_view(), name='User-Favourites'),
    path('recipes/<int:id>/fans', RecipeFans.as_view(), name='Recipe-Fans'),
]