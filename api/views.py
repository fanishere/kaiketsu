from goals.models import User, Goal, GoalDay
from rest_framework.views import APIView
from rest_framework import generics
from api.serializers import (
    UserCreateSerializer, UserSerializer,
    GoalSerializer, LoginUserSerializer,
    GoalDaySerializer, GoalAccomplishmentByDaySerializer
)
from datetime import timedelta
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authtoken.models import Token
from django.http import JsonResponse


@api_view(['GET', ])
def api_root(request, format=None):
    return Response({
        'users': reverse('user-list', request=request, format=format),
        'goals': reverse('goal-list', request=request, format=format),
    })


class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer
    permission_classes = (AllowAny,)


class GoalListView(generics.ListCreateAPIView):
    serializer_class = GoalSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return Goal.objects.filter(user=user)

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)

    def create(self, request, *args, **kwargs):
        durations = {}
        durations['ONE MONTH'] = timedelta(days=30)
        durations['THREE MONTHS'] = timedelta(days=60)

        serializer = self.get_serializer(data=request.data)
        duration_response = serializer.initial_data['duration']

        serializer.initial_data['duration'] = durations[duration_response]

        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class GoalDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = GoalSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return Goal.objects.filter(user=user)


class RegistrationAPIView(generics.GenericAPIView):
    serializer_class = UserCreateSerializer
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": Token.objects.get_or_create(user=user)[0].key
        })


class LoginAPIView(generics.GenericAPIView):
    serializer_class = LoginUserSerializer
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": Token.objects.get_or_create(user=user)[0].key
        })


class GoalDayList(generics.ListCreateAPIView):
    serializer_class = GoalDaySerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        goal = Goal.objects.get(pk=self.kwargs['pk'])
        return GoalDay.objects.filter(goal=goal).order_by('created_at')

    def perform_create(self, serializer):
        goal = Goal.objects.get(pk=self.kwargs['pk'])
        serializer.save(goal=goal)


class GetUserGoalAccomplishment(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        days = request.user.get_days()
        accomplishments = {}
        print("made it here")
        for day in days:
            if day.created_at not in accomplishments:
                accomplishments[day.created_at] = {
                        'total': 0,
                        'true': 0
                    }

            if day.goal_met is True:
                accomplishments[day.created_at] = {
                    'total': accomplishments[day.created_at]['total'] + 1,
                    'true': accomplishments[day.created_at]['true'] + 1
                }
            else:
                accomplishments[day.created_at] = {
                    'total': accomplishments[day.created_at]['total'] + 1,
                    'true': accomplishments[day.created_at]['true']
                }
        print("and here", accomplishments)
        pls = dict(
            ((key.isoformat()), value)
            for (key, value) in accomplishments.items())
        print("and here", pls)
        return JsonResponse(pls)
