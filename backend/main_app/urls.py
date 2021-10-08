from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('login', TokenObtainPairView.as_view(), name='login'),
    path('token_refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('users', views.Users.as_view(), name='Users'),
    path('users/<int:id>', views.OneUser.as_view(), name='User'),
]