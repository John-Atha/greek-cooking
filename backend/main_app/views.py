import json
from main_app.serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
import magic

def get_mime_type(file):
    initial_pos = file.tell()
    file.seek(0)
    mime_type = magic.from_buffer(file.read(1024), mime=True)
    file.seek(initial_pos)
    print(mime_type)
    return mime_type

def paginate(start, end, items):
    if start is not None:
        try:
            start = int(start)
            if start<1:
                return Response({"error": "Invalid start parameter."}, status.HTTP_400_BAD_REQUEST)
        except ValueError:
            return Response({"error": "Invalid start parameter."}, status.HTTP_400_BAD_REQUEST)
        items = items[start-1:]
    if end is not None:
        try:
            end = int(end)
            if start:
                if end<start:
                    return Response({"error": "End parameter must be larger or equal to start parameter."}, status.HTTP_400_BAD_REQUEST)
                else:
                    items = items[:end-start+1]
            else:
                if end>0:
                    items = items[:end]
                else:
                    return Response({"error": "Invalid end parameter."}, status.HTTP_400_BAD_REQUEST)
        except ValueError:
            return Response({"error": "Invalid end parameter."}, status.HTTP_400_BAD_REQUEST)
    return items


class Users(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        start = request.GET.get('start')
        end = request.GET.get('end')
        users = [UserSerializer(user).data for user in User.objects.all()]
        res = paginate(start, end, users)
        if type(res) == Response:
            return res
        return Response(res, status.HTTP_200_OK)
    
    def post(self, request):
        print(request.data)
        if request.data.get('password') == request.data.get('confirmation') and request.data.get('password') is not None:
            user = UserSerializer(data=request.data)
            if user.is_valid():
                user.save()
                new_user = User.objects.get(id=user.data.get('id'))
                new_user.set_password(request.data.get('password'))
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
            return Response(f"User '{id}' does not exist", status.HTTP_404_NOT_FOUND)

    def put(self, request, id):
        try:
            user = User.objects.get(id=id)
            if request.user == user:
                data = request.data
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

class Recipes(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        start = request.GET.get('start')
        end = request.GET.get('end')
        recipes = [RecipeSerializer(recipe).data for recipe in Recipe.objects.all()]
        res = paginate(start, end, recipes)
        if type(res) == Response:
            return res
        return Response(res, status.HTTP_200_OK)
    
    def post(self, request):
        if not request.user.is_anonymous:
            if 'image' in request.data:
                mime_type = get_mime_type(request.data['image'])
                if 'image' not in mime_type:
                    return Response('Invalid image file.', status=status.HTTP_400_BAD_REQUEST)
            recipe = Recipe(owner=request.user)
            recipe = RecipeSerializer(recipe, data=request.data)
            if recipe.is_valid():
                recipe.save()
                return Response(recipe.data, status.HTTP_200_OK)
            return Response(recipe.errors, status.HTTP_400_BAD_REQUEST)
        return Response("Unauthorized", status.HTTP_401_UNAUTHORIZED)

class OneRecipe(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, id):
        try:
            recipe = Recipe.objects.get(id=id)
            return Response(RecipeSerializer(recipe).data, status.HTTP_200_OK)
        except Recipe.DoesNotExist:
            return Response(f"Recipe '{id}' not found", status.HTTP_404_NOT_FOUND)
    
    def put(self, request, id):
        try:
            recipe = Recipe.objects.get(id=id)
            if 'image' in request.data:
                mime_type = get_mime_type(request.data['image'])
                if 'image' not in mime_type:
                    return Response('Invalid image file.', status=status.HTTP_400_BAD_REQUEST)
            recipe = RecipeSerializer(recipe, data=request.data, partial=True)
            if recipe.is_valid():
                recipe.save()
                return Response(recipe.data, status.HTTP_200_OK)
            return Response(recipe.errors, status.HTTP_400_BAD_REQUEST)
        except Recipe.DoesNotExist:
            return Response(f"Recipe '{id}' not found", status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        try:
            recipe = Recipe.objects.get(id=id)
            if request.user == recipe.owner:
                recipe.delete()
                return Response("Recipe deleted", status.HTTP_200_OK)
            return Response("Unauthorized", status.HTTP_401_UNAUTHORIZED)
        except Recipe.DoesNotExist:
            return Response(f"Recipe '{id}' not found", status.HTTP_400_BAD_REQUEST)

class UserRecipes(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, id):
        try:
            user = User.objects.get(id=id)
            start = request.GET.get('start')
            end = request.GET.get('end')
            recipes = [RecipeSerializer(recipe).data for recipe in user.recipes.all()]
            res = paginate(start, end, recipes)
            if type(res) == Response:
                return res
            return Response(res, status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response(f"User '{id}' not found", status.HTTP_400_BAD_REQUEST)

class UserFavourites(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, id):
        try:
            user = User.objects.get(id=id)
            start = request.GET.get('start')
            end = request.GET.get('end')
            recipes = [RecipeSerializer(recipe).data for recipe in user.favourites.all()]
            res = paginate(start, end, recipes)
            if type(res) == Response:
                return res
            return Response(res, status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response(f"User '{id}' not found", status.HTTP_400_BAD_REQUEST)
    
    def post(self, request, id):
        try:
            user = User.objects.get(id=id)
            if request.user == user:
                recipe_id = request.data.get('recipe_id')
                if recipe_id:
                    try:
                        recipe = Recipe.objects.get(id=recipe_id)
                        user.favourites.add(recipe)
                        return Response([UserSerializer(user).data for user in recipe.fans.all()])
                    except Recipe.DoesNotExist:
                        return Response(f"Recipe '{recipe_id}' not found", status.HTTP_400_BAD_REQUEST)
                return Response("No recipe id given", status.HTTP_400_BAD_REQUEST)
            return Response("Unauthorized", status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response(f"User '{id}' not found", status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        try:
            user = User.objects.get(id=id)
            if request.user == user:
                recipe_id = request.GET.get('recipe_id')
                if recipe_id:
                    try:
                        recipe = Recipe.objects.get(id=recipe_id)
                        user.favourites.remove(recipe)
                        return Response([UserSerializer(user).data for user in recipe.fans.all()])
                    except Recipe.DoesNotExist:
                        return Response(f"Recipe '{recipe_id}' not found", status.HTTP_400_BAD_REQUEST)
                return Response("No recipe id given", status.HTTP_400_BAD_REQUEST)
            return Response("Unauthorized", status.HTTP_401_UNAUTHORIZED)
        except User.DoesNotExist:
            return Response(f"User '{id}' not found", status.HTTP_400_BAD_REQUEST)

class RecipeFans(APIView):
    def get(self, request, id):
        try:
            recipe = Recipe.objects.get(id=id)
            start = request.GET.get('start')
            end = request.GET.get('end')
            fans = [UserSerializer(user).data for user in recipe.fans.all()]
            res = paginate(start, end, fans)
            if type(res) == Response:
                return res
            return Response(res, status.HTTP_200_OK)
        except Recipe.DoesNotExist:
            return Response(f"Recipe '{id}' not found", status.HTTP_400_BAD_REQUEST)