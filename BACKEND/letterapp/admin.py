from django.contrib import admin

from .models import Letter


class LetterAdmin(admin.ModelAdmin):
    readonly_fields = ('date_created', 'last_updated',)
    search_fields = [
        'mailbox__user__phone', 'mailbox__user__name', 'mailbox__user__user__username', 'date_created'
    ]


admin.site.register(Letter, LetterAdmin)
