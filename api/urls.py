from django.urls import path, include
from api import views

urlpatterns = [
    path('', views.api_root),
    path(
        'api-auth/',
        include('rest_framework.urls')
        ),
    path('users/', views.UserList.as_view(), name='user-list'),
]
