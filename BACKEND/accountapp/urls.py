from django.urls import path
from accountapp.views import KakaoLoginView, AddUserInfoView, LogoutView, SignoutView, KakaoLoginTestView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import (
    LoginView
)

app_name = "accountapp"

urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('account/login/kakao', KakaoLoginView.as_view(), name="login"),
    path('account/login', LoginView.as_view(), name='user_login'),
    path('account/test', KakaoLoginTestView.as_view(), name='kakao_login_test' ),
    path('account/<int:pk>/userInfo', AddUserInfoView.as_view(), name='user_info'),
    path('account/logout', LogoutView.as_view(), name='user_login'),
    path('account/signout', SignoutView.as_view(), name='user_signout'),
]
