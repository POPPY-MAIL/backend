from django.db import models
from django.utils import timezone


class AppUser(models.Model):
    id = models.BigIntegerField(primary_key=True, db_column='user_id')
    name = models.CharField(max_length=20)
    phone = models.CharField(max_length=20, null=True, blank=True)
    gender = models.CharField(max_length=20, null=True, blank=True)
    birthdate = models.DateTimeField(null=True, blank=True)
    date_created = models.DateTimeField(default=timezone.now, null=True, blank=True)
    last_updated = models.DateTimeField(default=timezone.now, null=True, blank=True)
    email = models.EmailField(unique=True, null=True, blank=True)

    class Meta:
        db_table = 'user'
