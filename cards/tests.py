from django.test import TestCase
from rest_framework.test import APITestCase
from cards.models import Card
# Create your tests here.


class CardTestCase(APITestCase):
    def setUp(self):
        Card.objects.create(
            number='1234567890123456',
            status='UN',
            pin='0000'
        )

    def test_save_model(self):
        card_count = Card.objects.count()
        self.assertEqual(card_count, 1)
