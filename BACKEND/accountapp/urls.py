from django.urls import path
from accountapp.views import KakaoLoginView, AddUserInfoView, LogoutView, SignoutView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import (
    LoginView
)

app_name = "accountapp"

urlpatterns = [
    path('account/login/kakao', KakaoLoginView.as_view(), name="login"),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('account/login', LoginView.as_view(), name='user_login'),
    path('account/<int:pk>/userInfo', AddUserInfoView.as_view(), name='user_info'),
    path('account/logout', LogoutView.as_view(), name='user_login'),
    path('account/signout', SignoutView.as_view(), name='user_signout'),
]
