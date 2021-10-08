import json
from django.shortcuts import render
from main_app.serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework import permissions, status
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

class Users(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        users = [UserSerializer(user).data for user in User.objects.all()]
        return Response(users, status.HTTP_200_OK)
    
    def post(self, request):
        username = request.POST.get('username')
        password = request.POST.get('password')
        confirmation = request.POST.get('confirmation')
        email = request.POST.get('email')
        data = {
            'username': username,
            'password': password,
            'email': email,
        }
        if password == confirmation and password is not None:
            user = UserSerializer(data=data)
            if user.is_valid():
                user.save()
                new_user = User.objects.get(id=user.data.get('id'))
                new_user.set_password(password)
                new_user.save()               
                return Response(user.data, status.HTTP_200_OK)
            return Response(user.errors, status.HTTP_400_BAD_REQUEST)
        return Response('Invalid passwords', status.HTTP_400_BAD_REQUEST)

class OneUser(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, id):
        try:
            user = User.objects.get(id=id)
            return Response(UserSerializer(user).data, status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response(f"User '{id}' does not exist", status.HTTP_400_BAD_REQUEST)

    def put(self, request, id):
        try:
            user = User.objects.get(id=id)
            if request.user == user:
                data = json.loads(request.body)
                user = UserSerializer(user, data=data, partial=True)
                if user.is_valid():
                    user.save()
                    return Response(user.data, status.HTTP_200_OK)
                return Response(user.errors, status.HTTP_400_BAD_REQUEST)
            return Response("Unauthorized", status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response(f"User '{id}' does not exist", status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        try:
            user = User.objects.get(id=id)
            print('lalalala')
            if request.user == user:
                user.delete()
                return Response(f"User '{id}' deleted", status.HTTP_400_BAD_REQUEST)
            return Response("Unauthorized", status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response(f"User '{id}' does not exist", status.HTTP_400_BAD_REQUEST)
        