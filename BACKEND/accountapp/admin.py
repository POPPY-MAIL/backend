from django.contrib import admin
from .models import AppUser


class AppUserAdmin(admin.ModelAdmin):
    search_fields = ['user__username', 'name', 'phone']


admin.site.register(AppUser, AppUserAdmin)
