from django.contrib import admin
from django.urls import path, include
from api import urls as api_urls
from rest_framework.authtoken import views as auth_views


urlpatterns = [
    path('api/', include(api_urls)),
    path('api-token-auth/', auth_views.obtain_auth_token),
    path('admin/', admin.site.urls),
]
