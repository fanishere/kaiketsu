from django.urls import path, include
from api import views
from rest_framework.authtoken import views as auth_views

urlpatterns = [
    path('', views.api_root),
    path(
        'api-auth/',
        include('rest_framework.urls')
        ),
    path('api-token-auth/', auth_views.obtain_auth_token),
    path('users/', views.UserList.as_view(), name='user-list'),
    path('users/register', views.UserRegister.as_view(), name='user-register'),
]
