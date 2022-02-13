import requests
from django.contrib.auth.models import User

from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from accountapp.models import AppUser


class LoginMixin:

    def get_user_from_kakao(kakao_access_token):
        """
        카카오톡에 사용자 정보 요청
        """
        headers = {"Authorization": f"Bearer {kakao_access_token}"}
        url = "https://kapi.kakao.com/v2/user/me"
        return requests.request(method="POST", url=url, headers=headers)

    def check_user_in_db(username):
        """
        전달된 값에 해당하는 User가 DB에 있는지 확인하여 새로운 사용자인 경우 User와 AppUser 생성 후 반환
        """
        try:
            auth_user = User.objects.get(username=username)
            app_user = AppUser.objects.get(pk=auth_user)
            return auth_user, app_user, True
        except User.DoesNotExist:  # 신규 회원일 때
            auth_user = User.objects.create_user(
                username=username, email="test@gmail.com", password="poppymail"
            )
            app_user = AppUser.objects.create(user=auth_user)
            return auth_user, app_user, False

    def create_jwt(username):
        """
        simple-jwt을 사용해 토큰 생성
        """
        serializer = TokenObtainPairSerializer(
            data={"username": username, "password": "poppymail"}
        )

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        return serializer.validated_data

    def check_mailbox_today(app_user):
        if app_user.check_mailbox_today():
            return "true"
        return "false"
