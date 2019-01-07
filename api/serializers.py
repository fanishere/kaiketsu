from rest_framework import serializers
from goals.models import (
    User, Goal
)


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('username',)
