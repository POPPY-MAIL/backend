from django.urls import path
from . import views

app_name = "accountapp"

urlpatterns = [
    path('login/kakao/', KakaoLoginView.as_view(), name="login"),
]
