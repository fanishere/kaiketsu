from django.urls import path, include
from api import views


urlpatterns = [
    path('', views.api_root),
    path('api-auth/',
         include('rest_framework.urls')
         ),
    path('users/', views.UserListView.as_view(), name='user-list'),
    path('users/<pk>/', views.UserDetailView.as_view(), name='user-detail'),
    path('register/',
         views.RegistrationAPIView.as_view(),
         name='user-register'),
    path('login/',
         views.LoginAPIView.as_view(),
         name='user-login'),
    path('goals/', views.GoalListView.as_view(), name='goal-list'),
    path('goals/<pk>/', views.GoalDetailView.as_view(), name='goal-detail'),
]
