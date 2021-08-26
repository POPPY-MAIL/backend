import jwt
import requests
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views import View
from django.views.decorators.csrf import csrf_exempt

from BACKEND.settings.local import SECRET_KEY  # 로컬 : local
from accountapp.models import AppUser
from requests import Response
from rest_framework import request, status
from rest_framework.generics import GenericAPIView, CreateAPIView
from rest_framework.permissions import AllowAny

from rest_framework.views import APIView
from .serializers import AddUserInfoSerializer


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
    permission_classes = AllowAny
    # 카카오톡에 사용자 정보 요청
    def getUserFromKakao(self, request):
        access_token = request.headers["Authorization"]
        headers = ({'Authorization': f"Bearer {access_token}"})
        url = "https://kapi.kakao.com/v2/user/me"  # Authorization(프론트에서 전달한 카카오 access_token)을 이용해서 회원 정보를 받아오기 위한 카카오 API
        response = requests.request("POST", url, headers=headers)  # API를 요청하여 회원의 정보를 response에 저장
        return response.json()

    # DB에 있는지 판별
    def checkUserInDB(self, kakao_user):
        try:
            user = User.objects.get(username=kakao_user['id']
            return user, True
        except User.DoesNotExist:  # 신규 회원일 때
            user = User.objects.create_user(
                kakao_user['id'],
                'test@gmail.com',
                'poppymail'
            )
            return user, False

    # 토큰 생성 (simple-jwt)
    def createJWT(self, user):
        url = 'http://127.0.0.1:8000/api/token/'  # 배포 후 url 변경
        payload = {'username': user.username, 'password': 'poppymail'}
        return requests.post(url, json=payload)

    def post(self, request):
        kakao_user = self.getUserFromKakao(request)
        user, check = self.checkUserInDB(kakao_user)

        if check:
            is_new = 'N'
        else:
            is_new = 'Y'

        response = self.createJWT(user)
        return JsonResponse( # 수정) serializer로 변경 가능한지 생각해보기
            {
                'access': response.json()['access'],
                'refresh': response.json()['refresh'],
                'is_new': is_new
            },
            status=200,
        )


class AddUserInfoView(CreateAPIView): # 사용자 정보 추가 입력, create-only endpoint
    # 인증 & 허가 - JWTAuthentication, IsAuthenticated

    serializer_class = AddUserInfoSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create_userInfo(request, serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create_userInfo(self, request, serializer):
        auth_user = request.user
        serializer.save(
            user=auth_user
        )





"""




class LogoutView(): # 로그아웃

class SignoutView(): # 탈퇴

"""
