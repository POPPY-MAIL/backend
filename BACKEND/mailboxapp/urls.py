from rest_framework import routers
from mailboxapp.views import MailBoxViewSet

# [GET, POST] mailbox
# mailbox/<int:mailbox_pk>/secretkey

router = routers.DefaultRouter()
router.register(r'mailbox', MailBoxViewSet)
urlpatterns = router.urls
