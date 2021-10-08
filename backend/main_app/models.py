from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.fields import EmailField

class User(AbstractUser):
    email = EmailField(max_length=50, unique=True, null=False)

    class Meta:
        ordering = ['id']