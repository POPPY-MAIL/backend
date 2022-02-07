from django.contrib.auth.models import User
from django.urls import reverse

from rest_framework.test import APITestCase
from rest_framework import status
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from accountapp.models import AppUser


class SignOutTestCase(APITestCase):
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

    def test_탈퇴_성공(self):
        """
        탈퇴 성공 시 응답으로 204를 반환한다.
        """
        # given
        url = reverse(viewname="accountapp:user_signout")
        expected_num_of_user = 0
        # when
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + self.access_token)
        response = self.client.delete(path=url)
        # then
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(User.objects.count(), expected_num_of_user)

    def test_HTTP_요청_헤더에_Bearer_Token이_없는_경우_탈퇴_실패(self):
        """
        HTTP Authorization 요청 헤더에 Bearer 토큰이 없는 경우 응답으로 401을 반환한다.
        """
        # given
        url = reverse(viewname="accountapp:user_signout")
        # when
        response = self.client.delete(path=url)
        # then
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(
            response.json()["detail"],
            "자격 인증데이터(authentication credentials)가 제공되지 않았습니다.",
        )

    def test_유효한_토큰이_아닌_경우_탈퇴_실패(self):
        """
        HTTP Authorization 요청 헤더에 설정된 Bearer 토큰이 유효하지 않은 경우 401을 반환한다.
        """
        # given
        url = reverse(viewname="accountapp:user_signout")
        invalid_token = "happy-poppy"
        # when
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + invalid_token)
        response = self.client.delete(path=url)
        # then
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.json()["code"], "token_not_valid")
