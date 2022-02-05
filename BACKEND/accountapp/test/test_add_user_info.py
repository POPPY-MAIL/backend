from django.contrib.auth.models import User
from django.urls import reverse

from rest_framework.test import APITestCase
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import status

from accountapp.models import AppUser


class AddUserInfoTestCase(APITestCase):
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

    def test_사용자_정보_추가_저장_성공(self):
        """
        name, phone, gender, birthdate를 추가로 저장한다.
        """
        # given
        user = User.objects.get()
        url = reverse(viewname="accountapp:user_info", args=[user.id])
        expected_name = "tester"
        expected_phone = "010-1111-1111"
        expected_birthdate = "2022-01-09"

        # when
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + self.access_token)
        response = self.client.patch(
            path=url,
            data={
                "name": expected_name,
                "phone": expected_phone,
                "birthdate": expected_birthdate,
            },
        )
        # then
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()["name"], expected_name)
        self.assertEqual(response.json()["phone"], expected_phone)
        self.assertEqual(response.json()["gender"], "")
        self.assertEqual(response.json()["birthdate"], expected_birthdate)

    def test_HTTP_요청_헤더에_Bearer_Token이_없는_경우_사용자_정보_추가_저장_실패(self):
        """
        HTTP Authorization 요청 헤더에 Bearer 토큰이 없는 경우 응답으로 401을 반환한다.
        """
        # given
        user = User.objects.get()
        url = reverse(viewname="accountapp:user_info", args=[user.id])
        # when
        response = self.client.patch(path=url)
        # then
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(
            response.json()["detail"],
            "자격 인증데이터(authentication credentials)가 제공되지 않았습니다.",
        )

    def test_유효한_토큰이_아닌_경우_사용자_정보_추가_저장_실패(self):
        """
        HTTP Authorization 요청 헤더에 설정된 Bearer 토큰이 유효하지 않은 경우 401을 반환한다.
        """
        # given
        user = User.objects.get()
        url = reverse(viewname="accountapp:user_info", args=[user.id])
        invalid_token = "poppy-world"
        # when
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + invalid_token)
        response = self.client.patch(path=url)
        # then
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.json()["code"], "token_not_valid")

    def test_잘못된_형식의_요청_데이터인_경우_사용자_정보_추가_저장_실패(self):
        """
        name[Char], phone[Char], gender[Char], date[Date] 형식과 다른 경우 응답으로 400을 반환한다.
        """
        # given
        user = User.objects.get()
        url = reverse(viewname="accountapp:user_info", args=[user.id])
        expected_name = "tester"
        expected_phone = "010-1111-1111"
        expected_birthdate = "20220109"
        # when
        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + self.access_token)
        response = self.client.patch(
            path=url,
            data={
                "name": expected_name,
                "phone": expected_phone,
                "birthdate": expected_birthdate,
            },
        )
        # then
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.json()["birthdate"],
            ["Date의 포멧이 잘못되었습니다. 이 형식들 중 한가지를 사용하세요: YYYY-MM-DD."],
        )
