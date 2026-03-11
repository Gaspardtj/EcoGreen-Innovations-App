from rest_framework import viewsets, generics, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model
import requests
from .models import User, Article, PickupRequest, Product, Order, OrderItem, CropDiagnosis, Program, EnvironmentalData
from .serializers import (
    UserSerializer, RegisterSerializer, ArticleSerializer, 
    PickupRequestSerializer, ProductSerializer, OrderSerializer, 
    CropDiagnosisSerializer, ProgramSerializer
)

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['GET'])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'

class PickupRequestViewSet(viewsets.ModelViewSet):
    queryset = PickupRequest.objects.all()
    serializer_class = PickupRequestSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == User.Role.ADMIN:
            return PickupRequest.objects.all()
        elif user.role == User.Role.COLLECTOR:
            return PickupRequest.objects.filter(collector=user)
        return PickupRequest.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['PATCH'])
    def update_status(self, request, pk=None):
        pickup = self.get_object()
        new_status = request.data.get('status')
        if new_status in PickupRequest.Status.values:
            pickup.status = new_status
            pickup.save()
            return Response({'status': pickup.status})
        return Response({'error': 'Invalid status'}, status=status.HTTP_400_BAD_REQUEST)

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

class CropDiagnosisViewSet(viewsets.ModelViewSet):
    queryset = CropDiagnosis.objects.all()
    serializer_class = CropDiagnosisSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return CropDiagnosis.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Placeholder for AI logic
        serializer.save(user=self.request.user)

class ProgramViewSet(viewsets.ModelViewSet):
    queryset = Program.objects.all()
    serializer_class = ProgramSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    @action(detail=True, methods=['POST'])
    def register(self, request, pk=None):
        program = self.get_object()
        program.participants.add(request.user)
        return Response({'status': 'registered'})

class EnvironmentalViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]

    @action(detail=False, methods=['GET'])
    def live_stats(self, request):
        try:
            # Uganda Air Quality from OpenAQ
            response = requests.get("https://api.openaq.org/v2/latest?country=UG&limit=10", timeout=10)
            stats = []
            
            if response.status_code == 200:
                results = response.json().get('results', [])
                for res in results:
                    measurements = res.get('measurements', [])
                    for m in measurements:
                        stats.append({
                            'id': f"{res.get('location')}-{m.get('parameter')}",
                            'location': res.get('location'),
                            'city': res.get('city'),
                            'parameter': m.get('parameter').upper(),
                            'value': m.get('value'),
                            'unit': m.get('unit'),
                            'last_updated': m.get('lastUpdated')
                        })
            
            # Simulated data for carbon and temperature to complete the dashboard
            stats.append({
                'id': 'carbon-africa',
                'location': 'Africa Overall',
                'parameter': 'CARBON EMISSIONS',
                'value': 1.1,
                'unit': 'GtCO2',
                'source': 'World Bank Simulated',
                'last_updated': '2026-03-11'
            })
            stats.append({
                'id': 'temp-uganda',
                'location': 'Uganda',
                'parameter': 'TEMP CHANGE',
                'value': +1.4,
                'unit': '°C',
                'source': 'ClimateWatch Simulated',
                'last_updated': '2026-03-11'
            })
            
            return Response(stats)
        except Exception as e:
            # Fallback mock data
            return Response([
                {'id': 'kp-pm25', 'location': 'Kampala', 'city': 'Kampala', 'parameter': 'PM25', 'value': 45.2, 'unit': 'µg/m³', 'last_updated': '2026-03-11'},
                {'id': 'carbon-africa', 'location': 'Africa Overall', 'parameter': 'CARBON EMISSIONS', 'value': 1.1, 'unit': 'GtCO2', 'source': 'World Bank Simulated'}
            ])
