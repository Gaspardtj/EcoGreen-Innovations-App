from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    RegisterView, UserViewSet, ArticleViewSet, 
    PickupRequestViewSet, ProductViewSet, OrderViewSet, 
    CropDiagnosisViewSet, ProgramViewSet, EnvironmentalViewSet
)

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'articles', ArticleViewSet)
router.register(r'pickups', PickupRequestViewSet, basename='pickup')
router.register(r'products', ProductViewSet)
router.register(r'orders', OrderViewSet, basename='order')
router.register(r'diagnoses', CropDiagnosisViewSet, basename='diagnosis')
router.register(r'programs', ProgramViewSet)
router.register(r'environmental', EnvironmentalViewSet, basename='environmental')

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', include(router.urls)),
]
