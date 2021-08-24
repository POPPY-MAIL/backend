from rest_framework import serializers
from letterapp.models import Letter


# 특정 우체통의 모든 편지 조회 - id, mailbox, content, sender, color & number_of_letter
class ListLetterSerializer(serializers.ModelSerializer):
    number_of_letter = serializers.SerializerMethodField()  # 인자로 method_name 을 주지 않으면, default 로 get_<field_name> 호출함

    class Meta:
        model = Letter
        fields = ['id', 'mailbox', 'content', 'sender', 'color', 'number_of_letter']

    def get_number_of_letter(self, obj):
        return obj.mailbox.number_of_letter()


# 편지 작성 - content, sender, color
class CreateLetterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Letter
        fields = ['content', 'sender', 'color']
