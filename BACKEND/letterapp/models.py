from django.db import models

from mailboxapp.models import MailBox


class Letter(models.Model):
    id = models.BigIntegerField(primary_key=True, db_column='letter_id')
    mailbox = models.ForeignKey(MailBox, on_delete=models.CASCADE, related_name='letters')
    content = models.TextField()
    sender = models.CharField(max_length=20)

    ColorType = models.TextChoices('ColorType', 'RED YELLOW ORANGE')  # 수정 - value 값 변경해야 함 / Enum
    color = models.CharField(max_length=10, choices=ColorType.choices)

    date_created = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'letter'
