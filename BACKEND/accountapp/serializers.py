from rest_framework import serializers
from .models import AppUser


class AddUserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUser
        fields = ['name', 'phone', 'gender', 'birthdate']


"""
class LogoutSerializer(serializers.ModelSerializer):

class SignoutSerializer(serializers.ModelSerializer):
"""
