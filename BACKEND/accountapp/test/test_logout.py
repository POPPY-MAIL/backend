from django.contrib.auth.models import User
from django.urls import reverse

from rest_framework.test import APITestCase
from rest_framework import status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.token_blacklist.models import (
    BlacklistedToken,
    OutstandingToken,
)

from accountapp.models import AppUser


class UserLogoutTestCase(APITestCase):
    access_token = ""

    @classmethod
    def setUpTestData(cls):
        """
        User, AppUser와 API 요청 시 사용할 access token을 생성한다.
        """
        auth_user = User.objects.create_user(
            username="poppy", email="test@gmail.com", password="poppymail"
        )
        AppUser.objects.create(user=auth_user)

        serializer = TokenObtainPairSerializer(
            data={"username": "poppy", "password": "poppymail"}
        )
        serializer.is_valid(raise_exception=True)
        cls.access_token = serializer.validated_data["access"]

    def test_로그아웃_성공(self):
        """
        로그아웃 성공 시 응답으로 205를 반환한다.
        """
        # given
        user = User.objects.get()
        url = reverse(viewname="accountapp:user_logout")
        expected_num_of_blacklisted_token = OutstandingToken.objects.filter(
            user_id=user.id
        ).count()
        # when
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + self.access_token)
        response = self.client.post(path=url)
        # then
        self.assertEqual(
            BlacklistedToken.objects.count(), expected_num_of_blacklisted_token
        )
        self.assertEqual(response.status_code, status.HTTP_205_RESET_CONTENT)
        self.assertEqual(response.json(), ["로그아웃 성공"])

    def test_HTTP_요청_헤더에_Bearer_Token이_없는_경우_로그아웃_실패(self):
        """
        HTTP Authorization 요청 헤더에 Bearer 토큰이 없는 경우 응답으로 401을 반환한다.
        """
        # given
        url = reverse(viewname="accountapp:user_logout")
        # when
        response = self.client.post(path=url)
        # then
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(
            response.json()["detail"],
            "자격 인증데이터(authentication credentials)가 제공되지 않았습니다.",
        )

    def test_유효한_토큰이_아닌_경우_로그아웃_실패(self):
        """
        HTTP Authorization 요청 헤더에 설정된 Bearer 토큰이 유효하지 않은 경우 401을 반환한다.
        """
        # given
        url = reverse(viewname="accountapp:user_logout")
        invalid_token = "hello-poppy"
        # when
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + invalid_token)
        response = self.client.post(path=url)
        # then
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.json()["code"], "token_not_valid")
