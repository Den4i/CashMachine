from cards.models import Card, Operation
from rest_framework.response import Response
from rest_framework.views import APIView
from cards.api.serializers import OperationSerializer, CardSerializer
from rest_framework import viewsets


class CardCheckPin(APIView):
    def post(self, request, format=None):
        print(request.data)

        number = request.data.get('number')
        pincode = request.data.get('pincode')

        success = Card.objects.filter(number=number, pincode=pincode).exists()
        try:
            card = Card.objects.get(number=number)
        except Card.DoesNotExist:
            content = {'success': success}
            return Response(content)

        if success:
            content = {'success': True, 'incorrect': card.incorrect, 'balance': card.balance, 'cardId': card.pk}
            return Response(content)
        elif success is False and card:
            if card.status == 'UN':
                card.incorrect += 1
                if card.incorrect == 4:
                    card.status = 'LO'
                card.save()
            content = {'success': False, 'incorrect': card.incorrect, 'balance': card.balance, 'cardId': card.pk}
            return Response(content)

        content = {'success': success}
        return Response(content)


class CardCheckNumber(APIView):
    def post(self, request):
        print(request.data)
        number = request.data.get('number')
        success = Card.objects.filter(number=number).exists()
        if success:
            card = Card.objects.get(number=number)

            content = {'success': True, 'incorrect': card.incorrect}
            return Response(content)

        content = {'success': success}
        return Response(content)


class OperationViewSet(viewsets.ModelViewSet):
    queryset = Operation.objects.all()
    serializer_class = OperationSerializer


class CardViewSet(viewsets.ModelViewSet):
    queryset = Card.objects.all()
    serializer_class = CardSerializer


class WithdrawalSave(APIView):
    def post(self, request, *args, **kwargs):
        code = request.data.get('code')
        card_id = request.data.get('card')
        detail = request.data.get('detail')

        card = Card.objects.get(pk=card_id)

        newbalance = card.balance-detail

        if newbalance >= 0:

            Operation.objects.create(code=code, card=card, detail=detail)

            card.balance = newbalance
            card.save()

            content = {'success': True, 'balance': newbalance}

            return Response(content)

        content = {'success': False}

        return Response(content)