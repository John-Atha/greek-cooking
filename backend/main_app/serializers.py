from rest_framework import serializers
from main_app.models import *

class UserSerializer(serializers.ModelSerializer):
   class Meta:
       model = User
       fields = ['id', 'username', 'email', 'date_joined'] 