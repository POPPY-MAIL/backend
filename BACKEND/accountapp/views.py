from django.contrib.auth.models import User

from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import UpdateAPIView, DestroyAPIView
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework_simplejwt.token_blacklist.models import (
    BlacklistedToken,
    OutstandingToken,
)

from accountapp.models import AppUser
from accountapp.serializers import AddUserInfoSerializer
from accountapp.mixins import LoginMixin
from accountapp import response_msg


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        if "Authorization" not in request.headers:
            return Response(
                data={"msg": response_msg.NO_AUTHORIZATION_HEADER},
                status=status.HTTP_400_BAD_REQUEST,
            )

        access_token = request.headers["Authorization"]
        response = LoginMixin.get_user_from_kakao(kakao_access_token=access_token)

        if response.status_code != 200:
            return Response(
                data={"msg": response_msg.INVALID_KAKAO_ACCESS_TOKEN},
                status=status.HTTP_400_BAD_REQUEST,
            )

        auth_user, app_user, check = LoginMixin.check_user_in_db(
            username=response.json()["id"]
        )

        if check:  # 기존 사용자
            is_new = "false"
            check_mailbox_today = LoginMixin.check_mailbox_today(app_user=app_user)
        else:  # 신규 사용자
            is_new = "true"
            check_mailbox_today = "false"

        response = LoginMixin.create_jwt(username=auth_user.username)

        return Response(
            data={
                "access": response["access"],
                "refresh": response["refresh"],
                "is_new": is_new,
                "user_id": auth_user.id,
                "username": app_user.name,
                "check_mailbox_today": check_mailbox_today,
            },  # serializer.data와 동일한 형태
            status=status.HTTP_200_OK,
        )


class AddUserInfoView(UpdateAPIView):
    """
    로그인 후 사용자 정보 추가 입력(업데이트)
    인증 & 허가 - JWTAuthentication, IsAuthenticated (기본 설정) 사용
    """
    queryset = AppUser.objects.all()
    serializer_class = AddUserInfoSerializer


class LogoutView(APIView):  # 로그아웃
    # 인증 & 허가 - JWTAuthentication, IsAuthenticated (기본 설정)
    def post(self, request):
        tokens = OutstandingToken.objects.filter(user_id=request.user.id)
        for token in tokens:
            t, _ = BlacklistedToken.objects.get_or_create(token=token)

        content = {"로그아웃 성공"}
        return Response(content, status=status.HTTP_205_RESET_CONTENT)


class SignoutView(DestroyAPIView):  # 탈퇴
    # auth_user 삭제하면 -> AppUser, OutstandingToken, BlacklistedToken도 삭제됨 (서로 cascade로 설정되어 있음)
    # 인증 & 허가 - JWTAuthentication, IsAuthenticated (기본 설정)
    queryset = User.objects.all()

    def destroy(self, request, *args, **kwargs):
        instance = User.objects.get(pk=request.user.id)
        self.perform_destroy(instance)
        content = {"탈퇴 완료"}
        return Response(content, status=status.HTTP_204_NO_CONTENT)
