from rest_framework import routers
from mailboxapp.views import MailboxViewSet

# [GET, POST] mailbox
# mailbox/<int:mailbox_pk>/secretkey

router = routers.DefaultRouter()
router.register(r'mailbox', MailboxViewSet)
urlpatterns = router.urls
