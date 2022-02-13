from rest_framework import serializers

from accountapp.models import AppUser


class AddUserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUser
        fields = ["name", "phone", "gender", "birthdate"]
