from datetime import date, timedelta
from django.contrib.auth.models import User

from rest_framework.test import APITestCase

from accountapp.models import AppUser
from mailboxapp.models import MailBox
from letterapp.models import Letter


class AppUserTestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.auth_user = User.objects.create_user(
            username="1111", email="test@gmail.com", password="poppymail"
        )
        cls.app_user = AppUser.objects.create(user=cls.auth_user)

    # check_mailbox_today
    def test_사용자가_확인하지_않은_오픈된_우체통이_존재할_때_True_반환한다(self):
        # given
        MailBox.objects.create(
            user=self.app_user, open_date=date.today()
        )  # open_date: 오늘, checked: False
        expected_return_value = True
        # when
        return_value = self.app_user.check_mailbox_today()
        # then
        self.assertEqual(return_value, expected_return_value)

    # check_mailbox_today
    def test_사용자가_확인하지_않은_오픈된_우체통이_존재하지_않을_때_False_반환한다(self):
        # given
        MailBox.objects.create(
            user=self.app_user, open_date=date.today(), checked=True
        )  # open_date: 오늘, checked: True
        expected_return_value = False
        # when
        return_value = self.app_user.check_mailbox_today()
        # then
        self.assertEqual(return_value, expected_return_value)

    # number_of_mailboxes
    def test_사용자가_생성한_우체통의_총_개수를_반환한다(self):
        # given
        MailBox.objects.create(user=self.app_user, open_date=date.today())
        expected_num_of_mailbox = 1
        # when
        num_of_mailbox = self.app_user.number_of_mailboxes()
        # then
        self.assertEqual(num_of_mailbox, expected_num_of_mailbox)

    # number_of_letters_in_unopened_mailbox
    def test_사용자가_생성한_오픈되지_않은_모든_우체통에_담긴_편지의_개수를_반환한다(self):
        # given
        opened_mailbox = MailBox.objects.create(
            user=self.app_user, open_date=date.today()
        )
        unopened_mailbox = MailBox.objects.create(
            user=self.app_user, open_date=date.today() + timedelta(days=1)
        )
        Letter.objects.create(mailbox=opened_mailbox)
        Letter.objects.create(mailbox=unopened_mailbox)
        expected_num_of_letter = 1
        # when
        num_of_letter = self.app_user.number_of_letters_in_unopened_mailbox()
        # then
        self.assertEqual(num_of_letter, expected_num_of_letter)
