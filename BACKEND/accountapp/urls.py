from django.urls import path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from accountapp.views import LoginView, AddUserInfoView, LogoutView, SignoutView


app_name = "accountapp"

urlpatterns = [
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("account/login/", LoginView.as_view(), name="user_login"),
    path("account/<int:pk>/userInfo/", AddUserInfoView.as_view(), name="user_info"),
    path("account/logout/", LogoutView.as_view(), name="user_logout"),
    path("account/signout/", SignoutView.as_view(), name="user_signout"),
]
