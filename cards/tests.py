from cards.models import Card
import pytest


@pytest.mark.django_db
class Test_cardViewSet:
    def setup(self):
        Card.objects.create(
            number='1234567890123456',
            status='UN',
            pincode='0000',
            balance=0
        )

    def test_create(self):
        Card.objects.create(
            number='9999999999999999',
            status='UN',
            pincode='0000',
            balance=0
        )
        assert Card.objects.count() == 2

    def test_update(self):
        card = Card.objects.get(number='1234567890123456')
        card.pincode = '7777'
        card.save()
        assert Card.objects.get(number='1234567890123456').pincode == '7777'

    def test_delete(self):
        Card.objects.get(number='1234567890123456').delete()
        assert Card.objects.count() == 0
