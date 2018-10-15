from django.db import models

# Hello, Model

class Gate(models.Model):
    name = models.CharField(max_length=32)
    active = models.BooleanField(default=True)
    total_spots = models.IntegerField(default=1)
    master = models.BooleanField(default=True)


class Area(models.Model):
    name = models.CharField(max_length=32)
    total_spots = models.IntegerField(default=1)
    

class Ticket(models.Model):
    gate = models.ForeignKey(Gate, on_delete=models.CASCADE)
    clock_in = models.DateTimeField(auto_now_add=True)


class PaidTicket(models.Model):
    gate = models.ForeignKey(Gate, on_delete=models.CASCADE)
    clock_in = models.DateTimeField()
    clock_out = models.DateTimeField(auto_now_add=True)
    time_parked = models.IntegerField()
    amount_paid = models.IntegerField() #ALWAYS a round dollar amount
    payment_type = models.IntegerField()


class Spot(models.Model):
    area = models.ForeignKey(Area, on_delete=models.CASCADE)
    sensor_id = models.CharField(max_length=32)

