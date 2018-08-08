from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator


class Card(models.Model):
    status_choices = (
        ('UN', 'Незаблокированная'),
        ('LO', 'Заблокированная'),
    )

    number = models.CharField(verbose_name='Номер карты', max_length=16, unique=True)
    status = models.CharField(choices=status_choices, max_length=2)
    pincode = models.CharField(verbose_name='PIN', max_length=4)
    incorrect = models.IntegerField(default=0, validators=[MaxValueValidator(4), MinValueValidator(0)])
    balance = models.IntegerField(verbose_name="Баланс", validators=[MinValueValidator(0)])

    def __str__(self):
        return '%s %s %s %s' % (self.number, self.status, self.pincode, self.incorrect)


class Operation(models.Model):
    code_choices = (
        ('Ba', 'Баланс'),
        ('WI', 'Снятие денег')
    )
    timestamp = models.DateTimeField(auto_now_add=True)
    code = models.CharField(choices=code_choices, max_length=2)
    card = models.ForeignKey(Card, on_delete=models.CASCADE)
    detail = models.IntegerField(verbose_name='Детали операции', validators=[MinValueValidator(0)], default=0)

    def __str__(self):
        return '%s %s %s' % (self.timestamp, self.code, self.card_id)