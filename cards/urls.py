from django.urls import path, re_path
from cards.views import CardCheckPin, CardCheckNumber, WithdrawalSave


urlpatterns = [
    re_path('check_pin/', CardCheckPin.as_view()),
    path('check_number/', CardCheckNumber.as_view()),
    re_path('withdrawal_save', WithdrawalSave.as_view())
]
