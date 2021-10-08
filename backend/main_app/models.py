from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.fields import EmailField
from django.db.models import Count
from datetime import datetime
class User(AbstractUser):
    email = EmailField(max_length=50, unique=True, null=False)

    class Meta:
        ordering = ['id']

class Recipe(models.Model):
    title  = models.CharField(max_length=100, null=False)
    description = models.TextField(max_length=5000, null=False)
    image = models.ImageField(default=None, null=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='recipes', null=False)
    uploaded_at = models.DateTimeField(default=datetime.now)
    fans = models.ManyToManyField(User, related_name='favourites', blank=True)

    class Meta:
        ordering = ['-uploaded_at']