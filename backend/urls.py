from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from products.api.views import api_overview

urlpatterns = [
    path('', api_overview),
    path('admin/', admin.site.urls),
    path('api/', include('products.api.urls', namespace='products')),
    path('api/', include('account.api.urls', namespace='auth'))
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)