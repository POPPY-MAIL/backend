from django.urls import path
from accountapp.views import KakaoLoginView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

app_name = "accountapp"

urlpatterns = [
    # path('login/kakao/', KakaoLoginView.as_view(), name="login"),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
