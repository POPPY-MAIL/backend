from django.shortcuts import render

# Create your views here.
from requests import Response
from rest_framework import status

from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from mailboxapp.models import MailBox


class LetterRequestView(APIView):
    permission_classes = [AllowAny]

    # 메일박스에서 pk있는지 뒤져서 있으면 -> ok, 없으면 -> no such mailbox in DB
    def get(self, request, mailbox_pk):
        random_strkey = request.GET['key']
        # print(random_strkey)

        try:
            obj = MailBox.objects.get(id=mailbox_pk, key=random_strkey)
            return Response({'id': obj.id}, status=status.HTTP_200_OK)
        except MailBox.DoesNotExist:
            return Response({'No such a mailbox in DB'}, status=status.HTTP_204_NO_CONTENT)

    #
    # def post(self, request, mailbox_pk):

