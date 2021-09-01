from django.urls import path
from .views import LetterRequestView

app_name = "letterapp"

urlpatterns = [
    path('letter/<int:mailbox_pk>/<str:random_strkey>', LetterRequestView.as_view(), name="letter_request"),
]
