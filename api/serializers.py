from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from goals.models import (
    User, Goal
)


class UserSerializer(serializers.HyperlinkedModelSerializer):
    email = serializers.EmailField(required=True)
    username = serializers.CharField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    first_name = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = ('username', 'first_name', 'email',)


class UserCreateSerializer(serializers.HyperlinkedModelSerializer):
    email = serializers.EmailField(required=True)
    username = serializers.CharField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    first_name = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8)

    class Meta:
        model = User
        fields = ('username', 'first_name', 'email', 'password',)

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
