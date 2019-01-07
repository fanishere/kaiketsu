from django.urls import path, include
from api import views


urlpatterns = [
    path('', views.api_root),
    path(
        'api-auth/',
        include('rest_framework.urls')
        ),
    path('users/', views.UserListView.as_view(), name='user-list'),
    path('users/<pk>/', views.UserDetailView.as_view(), name='user-detail'),
    path(
        'users/register/', 
        views.UserRegisterView.as_view(),
        name='user-register'),
    path('goals/', views.GoalListView.as_view(), name='goal-list'),
]
