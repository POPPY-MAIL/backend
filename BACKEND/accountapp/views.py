import jwt
import requests
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt

# 로컬에서 돌릴 때, 아래 from BACKEND.settings.local import SECRET_KEY로 수정!!!!
from BACKEND.settings.local import SECRET_KEY
from accountapp.models import AppUser
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework import request, status
from rest_framework.generics import UpdateAPIView, DestroyAPIView
from rest_framework.permissions import AllowAny

from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .serializers import AddUserInfoSerializer
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken, OutstandingToken


@method_decorator(csrf_exempt, name='dispatch')
class KakaoLoginView(View):  # 카카오 로그인
    def post(self, request):
        access_token = request.headers["Authorization"]
        headers = ({'Authorization': f"Bearer {access_token}"})
        url = "https://kapi.kakao.com/v2/user/me"  # Authorization(프론트에서 받은 토큰)을 이용해서 회원의 정보를 확인하기 위한 카카오 API 주소
        response = requests.request("POST", url, headers=headers)  # API를 요청하여 회원의 정보를 response에 저장
        user = response.json()

        if AppUser.objects.filter(id=user['id']).exists():  # 기존에 소셜로그인을 했었는지 확인
            user_info = AppUser.objects.get(id=user['id'])

            encoded_jwt = jwt.encode({'id': user_info.id}, SECRET_KEY, algorithm='HS256')  # jwt토큰 발행
            return JsonResponse({  # jwt토큰, 이름, 타입 프론트엔드에 전달
                'access_token': encoded_jwt,
                'user_name': user_info.name,
                'user_pk': user_info.id
            }, status=200)

        else:
            new_user_info = AppUser(
                id=user['id'],
                name=user['properties']['nickname'],
                email=user['properties'].get('email', None)
            )
            new_user_info.save()

            encoded_jwt = jwt.encode({'id': new_user_info.id}, SECRET_KEY, algorithm='HS256')  # jwt토큰 발행
            none_member_type = 1
            return JsonResponse({
                'access_token': encoded_jwt,
                'user_name': new_user_info.name,
                'user_pk': new_user_info.id,
            }, status=200)


class LoginView(APIView):  # 로그인
    permission_classes = [AllowAny]

    # 카카오톡에 사용자 정보 요청
    def getUserFromKakao(self, request):
        access_token = request.headers["Authorization"]
        headers = ({'Authorization': f"Bearer {access_token}"})
        url = "https://kapi.kakao.com/v2/user/me"
        response = requests.request("POST", url, headers=headers)  # POST 요청하여 회원 정보 response에 저장
        return response.json()

    # DB에 있는지 판별
    def checkUserInDB(self, kakao_user):
        try:
            user = User.objects.get(username=kakao_user['id'])
            return user, True
        except User.DoesNotExist:  # 신규 회원일 때
            user = User.objects.create_user(
                kakao_user['id'],
                'test@gmail.com',
                'poppymail'
            )
            return user, False

    # simple-JWT을 사용해 토큰 생성 해주는 역할만 수행하면 됨
    def createJWT(self, user):
        serializer = TokenObtainPairSerializer(data={'username': user.username, 'password': 'poppymail'})

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        return serializer.validated_data

    def post(self, request):
        kakao_user = self.getUserFromKakao(request)
        user, check = self.checkUserInDB(kakao_user)

        if check:
            is_new = 'false'
        else:
            is_new = 'true'

        response = self.createJWT(user)

        return Response(
            data={
                'access': response['access'],
                'refresh': response['refresh'],
                'is_new': is_new,
                'user_id': user.id
            },  # serializer.data와 동일한 형태
            status=status.HTTP_200_OK
        )


class AddUserInfoView(UpdateAPIView):  # 사용자 정보 추가 입력(업데이트)
    # 인증 & 허가 - JWTAuthentication, IsAuthenticated (기본 설정)

    queryset = AppUser.objects.all()
    serializer_class = AddUserInfoSerializer

    def patch(self, request, *args, **kwargs):
        if AppUser.objects.filter(pk=request.user.id).exists() is False:  # 해당 id 값의 AppUser 객체가 없는 경우
            AppUser.objects.create(user=User.objects.get(pk=request.user.id))

        return self.partial_update(request, *args, **kwargs)


class LogoutView(APIView):  # 로그아웃
    # 인증 & 허가 - JWTAuthentication, IsAuthenticated (기본 설정)

    def post(self, request):
        tokens = OutstandingToken.objects.filter(user_id=request.user.id)
        for token in tokens:
            t, _ = BlacklistedToken.objects.get_or_create(token=token)

        content = {'로그아웃 성공'}
        return Response(content, status=status.HTTP_205_RESET_CONTENT)


class SignoutView(DestroyAPIView):  # 탈퇴
    # auth_user 삭제하면 -> AppUser, OutstandingToken, BlacklistedToken도 삭제됨 (서로 cascade로 설정되어 있음)
    # 인증 & 허가 - JWTAuthentication, IsAuthenticated (기본 설정)
    queryset = User.objects.all()

    def destroy(self, request, *args, **kwargs):
        instance = User.objects.get(pk=request.user.id)
        self.perform_destroy(instance)
        content = {'탈퇴 완료'}
        return Response(content, status=status.HTTP_204_NO_CONTENT)


class KakaoLoginTestView(APIView):
    permission_classes = [AllowAny]

    # 카카오톡에 사용자 정보 요청
    def post(self, request):
        access_token = request.headers["Authorization"]
        headers = ({'Authorization': f"Bearer {access_token}"})
        url = "https://kapi.kakao.com/v2/user/me"
        response = requests.request("POST", url, headers=headers)  # POST 요청하여 회원 정보 response에 저장
        content = {'카카오 사용자 정보 요청 성공'}
        return Response(
            content,
            status=status.HTTP_200_OK
        )
