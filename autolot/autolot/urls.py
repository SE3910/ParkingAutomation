from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic.base import RedirectView

favicon_view = RedirectView.as_view(url='/static/favicon.ico', permanent=True)

urlpatterns = [
    path('api/', include('api.urls')),
    path('dashboard/', include('dashboard.urls')),
    path('admin/', admin.site.urls),
    re_path(r'^favicon\.ico$', favicon_view),
]

