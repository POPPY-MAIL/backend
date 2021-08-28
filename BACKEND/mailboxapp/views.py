import random
import string

from datetime import date
from rest_framework.response import Response
from rest_framework import viewsets, status
from rest_framework.decorators import action
from .models import MailBox
from .serializers import CreateMailBoxSerializer, ListMailBoxSerializer, GetMailBoxSerializer
from letterapp.serializers import ListLetterSerializer, CreateLetterSerializer


def get_random_open_date():  # 랜덤 우체통 공개 날짜 생성 메서드
    # 랜덤 날짜 조건 : 우체통 봉인 시점(우체통 생성 후 3일 뒤)부터 1주일 ~ 1달 후
    mailbox_close_date = date.today() + 3
    return mailbox_close_date + random.randint(7, 30)


def get_random_key():  # 우체통 별 랜덤 키 값 생성 메서드
    key_length = 8
    string_pool = string.ascii_letters + string.digits  # 대소문자 + 숫자
    random_key = ""
    for i in range(key_length):
        random_key += random.choice(string_pool)
    return random_key


class MailBoxViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        app_user = self.request.user.app_user
        return MailBox.objects.filter(user=app_user)

    # GenericAPIView클래스의 get_serializer_class() 메서드 오버라이딩 - 조건에 맞는 Serializer 반환
    def get_serializer_class(self):
        if self.http_method_names == 'post':
            if self.name == 'create_letter':
                return CreateLetterSerializer
            return CreateMailBoxSerializer
        elif self.http_method_names == 'get':
            if self.name == 'get_letters':
                return ListLetterSerializer
            return ListMailBoxSerializer

    """
    POST mailbox (우체통 생성) 
    """

    def create(self, request, *args, **kwargs):
        # 우체통 5개까지만 생성 가능 조건 추가
        if request.user.app_user.number_of_mailboxes() == 5:  # 수정 필요 사항 - AppUser 객체 내에 해당 메서드 생성하여 호출하기
            content = {'우체통 개수 초과하여 생성 불가'}
            return Response(content, status=status.HTTP_403_FORBIDDEN)

        serializer = self.get_serializer(data=request.data)  # CreateMailBoxSerializer
        serializer.is_valid(raise_exception=True)

        mailbox = self.perform_create_mailbox(serializer)
        response_mailbox_serializer = GetMailBoxSerializer(mailbox)

        headers = self.get_success_headers(response_mailbox_serializer.data)
        content = {'우체통 생성 완료'}
        return Response(response_mailbox_serializer.data, content, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create_mailbox(self, request, serializer):
        # user, link_title, open_date 값 추가하기
        mailbox = serializer.save(
            user=request.user.app_user,
            link_title=request.data['nickname'] + '의 우체통',
            open_date=get_random_open_date(),
        )
        # key, mailbox_link 필드에 값 추가
        random_key = get_random_key()
        mailbox.key = random_key
        mailbox.mailbox_link = mailbox.set_mailbox_link() + '/?key=' + random_key
        return mailbox.save()

    """
    GET mailbox (개인의 모든 우체통 조회) - ModelViewSet 에 이미 정의되어 있음(수정 X) 
    """

    """
    GET mailbox/<int:mailbox_pk>/letters - 특정 우체통 편지 조회 
    """

    @action(detail=True, methods=['get'], url_path='letters', name='get_letters')
    def get_letters(self, pk=None):
        mailbox = MailBox.objects.get(pk=pk)
        queryset = mailbox.letters.all()  # 해당 우체통과 연관된 모든 편지 객체 반환

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data, status=status.HTTP_200_OK)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    """
    DELETE mailbox/<int:mailbox_pk> - ModelViewSet 에 이미 정의되어 있음(수정 X)
    """

    # 밑에 부분(get, post) 코드 작성하기 . . & authentication과 permission 설정 해줘야 함

    """
    GET mailbox/<int:mailbox_pk>/{우체통 별 랜덤값} -> 요청 body로 랜덤값 넘겨받기 -> 이거 아닌거 같아.. url에서 뽑아야 할 듯 ..
    """

    """
    POST mailbox/<int:mailbox_pk>/{우체통 별 랜덤값}
    """

    @action(detail=True, methods=['post'], url_path='letter', name='create_letter')
    def create_letter(self, request, pk=None):
        serializer = self.get_serializer(date=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create_letter(serializer, pk)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create_letter(self, serializer, pk):
        # mailbox 필드 값 추가하기
        serializer.save(
            mailbox=MailBox.objects.get(pk=pk)
        )
