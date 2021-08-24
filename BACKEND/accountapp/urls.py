from django.urls import path
from accountapp.views import KakaoLoginView

app_name = "accountapp"

urlpatterns = [
    path('login/kakao/', KakaoLoginView.as_view(), name="login"),
]
