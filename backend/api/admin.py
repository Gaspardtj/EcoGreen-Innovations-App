from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Article, PickupRequest, Product, Order, OrderItem, CropDiagnosis, Program

class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('role', 'phone_number', 'location', 'profile_image')}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ('role', 'phone_number', 'location', 'profile_image')}),
    )
    list_display = ['username', 'email', 'role', 'is_staff']
    list_filter = ['role', 'is_staff', 'is_superuser', 'is_active']

admin.site.register(User, CustomUserAdmin)
admin.site.register(Article)
admin.site.register(PickupRequest)
admin.site.register(Product)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(CropDiagnosis)
admin.site.register(Program)
