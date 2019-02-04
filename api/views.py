from goals.models import User, Goal, GoalDay
from rest_framework.views import APIView
from rest_framework import generics
from api.serializers import (
    UserCreateSerializer, UserSerializer,
    GoalSerializer, LoginUserSerializer,
    GoalDaySerializer
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
        'trophy-goals': reverse(
            'trophy-goal-list',
            request=request,
            format=format),
    })


class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class GoalListView(generics.ListCreateAPIView):
    serializer_class = GoalSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return Goal.objects.filter(user=user, active=True)

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)

    # matches timedeltas with client side form responses
    def create(self, request, *args, **kwargs):
        durations = {}
        durations['10 Days'] = timedelta(days=10)
        durations['30 Days'] = timedelta(days=30)
        durations['60 Days'] = timedelta(days=60)
        durations['90 Days'] = timedelta(days=90)

        serializer = self.get_serializer(data=request.data)
        duration_response = serializer.initial_data['duration']
        serializer.initial_data['duration'] = durations[duration_response]

        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
            headers=headers)


class ArchivedGoalListView(generics.ListAPIView):
    """
    Shows non-active trophied goals.
    """

    serializer_class = GoalSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return Goal.objects.filter(user=user, active=False)


class GoalDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = GoalSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        return Goal.objects.filter(user=user)


class RegistrationAPIView(generics.GenericAPIView):
    """
    Creates a user and creates a token, which is returned in the post response
    """

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
    """
    Validates login information and sends the user's token when
    authenticated.
    """
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
    """
    Shows a user's days on a specific goal.
    """

    serializer_class = GoalDaySerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        goal = Goal.objects.get(pk=self.kwargs['pk'])
        return GoalDay.objects.filter(goal=goal).order_by('created_at')

    def perform_create(self, serializer):
        goal = Goal.objects.get(pk=self.kwargs['pk'])
        serializer.save(goal=goal)


class GetUserGoalAccomplishment(APIView):
    """
    Shows a users goal engagement by day as a ratio of total active goals
    and the goals that they checked in for that day.
    """

    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        days = request.user.get_days()
        accomplishments = {}

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

        day_data = dict(
            ((key.isoformat()), value)
            for (key, value) in accomplishments.items())

        return JsonResponse(day_data)
