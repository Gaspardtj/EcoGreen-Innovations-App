from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import User, Article, PickupRequest, Product, Order, OrderItem, CropDiagnosis, Program

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'role', 'phone_number', 'location', 'profile_image', 'first_name', 'last_name')
        read_only_fields = ('id', 'role')

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'first_name', 'last_name', 'phone_number', 'location', 'role')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            phone_number=validated_data.get('phone_number', ''),
            location=validated_data.get('location', ''),
            role=validated_data.get('role', User.Role.MEMBER)
        )
        return user

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'

class PickupRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = PickupRequest
        fields = '__all__'
        read_only_fields = ('id', 'user', 'status', 'collector', 'created_at', 'updated_at')

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

class CropDiagnosisSerializer(serializers.ModelSerializer):
    class Meta:
        model = CropDiagnosis
        fields = '__all__'
        read_only_fields = ('id', 'user', 'disease_name', 'confidence', 'diagnosis_details', 'treatment_suggestions', 'created_at')

class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = '__all__'
