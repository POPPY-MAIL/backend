from django.contrib.auth.models import User
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APITestCase

from accountapp.mixins import LoginMixin
from accountapp.models import AppUser


class UserLoginTestCase(APITestCase):
    def test_카카오톡에_사용자_정보_요청_성공(self):
        """
        유효한 카카오 access_token인 경우 응답으로 200을 반환한다.

        주의: access_token은 카카오에서 발급받은 토큰이므로 유효시간이 존재한다.
        """
        # given
        access_token = "pBct-yUCsVbQDICBqd3XAjatAhMJwlamVWXDcAorDR4AAAF-yYnggA"
        # when
        response = LoginMixin.get_user_from_kakao(kakao_access_token=access_token)
        # then
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_카카오톡에_사용자_정보_요청_실패(self):
        """
        유효하지 않은 카카오 access_token인 경우 응답으로 401을 반환한다.
        """
        # given
        kakao_access_token = "poppy"
        # when
        response = LoginMixin.get_user_from_kakao(kakao_access_token=kakao_access_token)
        # then
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_신규_사용자일_때_User와_AppUser_생성_후_반환_성공(self):
        """
        신규 사용자인 경우 새로운 User와 AppUser가 생성된 후 반환된다.
        """
        # given
        username = "poppy"
        # when
        auth_user, app_user, check = LoginMixin.check_user_in_db(username=username)
        # then
        expected_auth_user = User.objects.get(username=username)
        expected_auth_user_id = expected_auth_user.id
        expected_app_user_id = AppUser.objects.get(pk=expected_auth_user).user_id
        expected_check = False

        self.assertEqual(auth_user.id, expected_auth_user_id)
        self.assertEqual(app_user.user_id, expected_app_user_id)
        self.assertEqual(check, expected_check)

    def test_기존_사용자일_때_User와_AppUser_반환_성공(self):
        """
        기존 사용자인 경우 기존의 User와 AppUser가 반환된다.
        """
        # given
        username = "hello poppy"
        expected_auth_user = User.objects.create_user(
            username=username, email="test@gmail.com", password="poppymail"
        )
        expected_app_user = AppUser.objects.create(user=expected_auth_user)
        # when
        auth_user, app_user, check = LoginMixin.check_user_in_db(username=username)
        # then
        self.assertEqual(auth_user.id, expected_auth_user.id)
        self.assertEqual(app_user.user_id, expected_app_user.user_id)
        self.assertEqual(check, True)

    def test_신규_사용자_로그인_성공(self):
        """
        신규 사용자인 경우 응답에 새로운 User가 생성되고, is_new = true가 반환된다.

        주의: access_token은 카카오에서 발급받은 토큰이므로 유효시간이 존재한다.
        """
        # given
        url = reverse(viewname="accountapp:user_login")
        access_token = "pBct-yUCsVbQDICBqd3XAjatAhMJwlamVWXDcAorDR4AAAF-yYnggA"
        # when
        response = self.client.post(path=url, HTTP_Authorization=access_token)
        # then
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(response.json()["user_id"], User.objects.get().id)
        self.assertEqual(response.json()["is_new"], "true")

    def test_기존_사용자_로그인_성공(self):
        """
        기존 사용자인 경우 응답에 is_new = false가 반환된다.

        주의:
        username에 설정한 값은 카카오로부터 받은 id 값이다.
        access_token은 카카오에서 발급받은 토큰이므로 유효시간이 존재한다.
        """
        # given
        expected_auth_user = User.objects.create_user(
            username="1870483544", email="test@gmail.com", password="poppymail"
        )
        AppUser.objects.create(user=expected_auth_user)

        url = reverse(viewname="accountapp:user_login")
        access_token = "pBct-yUCsVbQDICBqd3XAjatAhMJwlamVWXDcAorDR4AAAF-yYnggA"
        # when
        response = self.client.post(path=url, HTTP_Authorization=access_token)
        # then
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(response.json()["user_id"], User.objects.get().id)
        self.assertEqual(response.json()["is_new"], "false")

    def test_요청_헤더에_Authorization이_없는_경우_로그인_실패(self):
        """
        요청 헤더에 Authorization이 없는 경우 응답으로 400을 반환한다.
        """
        # given
        url = reverse(viewname="accountapp:user_login")
        # when
        response = self.client.post(path=url)
        # then
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
