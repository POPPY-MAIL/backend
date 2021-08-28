from django.db import models
from accountapp.models import AppUser


class MailBox(models.Model):
    id = models.BigAutoField(primary_key=True, db_column="mailbox_id")
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE, related_name="mailboxes")
    nickname = models.CharField(max_length=20)
    link_title = models.CharField(max_length=40)
    mailbox_link = models.URLField(null=True)  # default max_length = 200, 형태 = mailbox/<int:mailbox_pk>/letter
    open_date = models.DateField()  # 우체통 공개 날짜
    key = models.CharField(max_length=50, db_column="mailbox_key", null=True)  # 우체통 비밀키

    ThemeType = models.TextChoices('ThemeType', 'RED YELLOW ORANGE')  # 수정 - value 값 변경해야 함
    theme = models.CharField(max_length=20, choices=ThemeType.choices, null=True)

    date_created = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'mailbox'  # default: mailboxapp_mailbox

    def number_of_letter(self):  # 우체통의 편지 개수 반환 메서드
        return self.letters.count()  # using related_name

    def set_mailbox_link(self):
        return 'https://poppymail.com/mailbox/' + str(self.id)

    def check_mailbox_key(self, val):  # 사용자가 입력한 키 값이 올바른지 확인하는 메서드
        return self.key == val
