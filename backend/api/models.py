from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = 'admin', _('Admin')
        MEMBER = 'member', _('Member')
        FARMER = 'farmer', _('Farmer')
        COLLECTOR = 'collector', _('Waste Collector')

    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.MEMBER
    )
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    profile_image = models.ImageField(upload_to='profiles/', blank=True, null=True)

    def __str__(self):
        return f"{self.username} ({self.role})"

class Article(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    category = models.CharField(max_length=100)
    image = models.ImageField(upload_to='articles/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class PickupRequest(models.Model):
    class Status(models.TextChoices):
        PENDING = 'pending', _('Pending Approval')
        APPROVED = 'approved', _('Approved')
        ASSIGNED = 'assigned', _('Assigned to Collector')
        ON_THE_WAY = 'on_the_way', _('Collector On The Way')
        COLLECTED = 'collected', _('Collected')
        COMPLETED = 'completed', _('Completed')

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='pickup_requests')
    waste_type = models.CharField(max_length=100)
    estimated_amount = models.CharField(max_length=100)
    pickup_date = models.DateField()
    pickup_time = models.TimeField()
    address = models.TextField()
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    phone_number = models.CharField(max_length=15)
    notes = models.TextField(blank=True, null=True)
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING
    )
    collector = models.ForeignKey(
        User, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        related_name='assigned_pickups',
        limit_choices_to={'role': User.Role.COLLECTOR}
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Request {self.id} by {self.user.username}"

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField(default=0)
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    category = models.CharField(max_length=100)
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=50, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.id} by {self.user.username}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)

class CropDiagnosis(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='diagnoses')
    image = models.ImageField(upload_to='crop_diagnoses/')
    crop_type = models.CharField(max_length=100)
    disease_name = models.CharField(max_length=255, blank=True, null=True)
    confidence = models.FloatField(blank=True, null=True)
    diagnosis_details = models.TextField(blank=True, null=True)
    treatment_suggestions = models.TextField(blank=True, null=True)
    recommended_products = models.ManyToManyField(Product, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Diagnosis {self.id} - {self.crop_type}"

class Program(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    date = models.DateTimeField()
    location = models.CharField(max_length=255)
    image = models.ImageField(upload_to='programs/', blank=True, null=True)
    participants = models.ManyToManyField(User, related_name='registered_programs', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class EnvironmentalData(models.Model):
    location = models.CharField(max_length=100) # Africa, Uganda, etc.
    data_type = models.CharField(max_length=100) # Air Quality, Carbon, Temperature
    value = models.FloatField()
    unit = models.CharField(max_length=50)
    timestamp = models.DateTimeField(auto_now_add=True)
    source = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.data_type} in {self.location}"
