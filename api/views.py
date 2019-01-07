from django.shortcuts import render
from goals.models import User
from rest_framework import generics
from api.serializers import UserCreateSerializer, UserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse


@api_view(['GET', ])
def api_root(request, format=None):
    return Response({
        'users': reverse('user-list', request=request, format=format),
    })


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserRegister(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer
