from django.contrib import admin

from .models import MailBox


class MailBoxAdmin(admin.ModelAdmin):
    readonly_fields = ('date_created', 'last_updated',)
    search_fields = [
        'nickname', 'user__name', 'user__user__username', 'user__phone', 'date_created'
    ]


admin.site.register(MailBox, MailBoxAdmin)
