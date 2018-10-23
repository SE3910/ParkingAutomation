import datetime

from django.db import models

# Hello, Model

class Gate(models.Model):
    name = models.CharField(max_length=32)
    active = models.BooleanField(default=True)
    total_spots = models.IntegerField(default=1)
    master = models.BooleanField(default=True)

    def enter(self):
        t = Ticket(gate=self)
        t.save()
        return t

    def exit(self, t):
        d = datetime.now()
        a = t.clock_in - d 
        dur = a.hour + a.minute/60.0
        r = Rate.objects.filter(max_time__gt=dur).filter(min_time__lte=dur)
        p = PaidTicket(id=t.id, gate=self, clock_in = t.clock_in, time_parked = a, amount_paid=r.charge, payment_type='CC')
        p.save()
        return p

    def available(self):
        return total_spots - self.ticket_set.count()

    def json(self):
        return {'name': self.name, 'active': 'true' if self.active else 'false', 'totalSpots': str(self.total_spots), 'tickets': [t.json() for t in self.ticket_set.all()]}
        

class Area(models.Model):
    name = models.CharField(max_length=32)
    total_spots = models.IntegerField(default=1)
    

class Ticket(models.Model):
    gate = models.ForeignKey(Gate, on_delete=models.CASCADE)
    clock_in = models.DateTimeField(auto_now_add=True)

    def json(self):
        return {'ticketId': str(self.id), 'timestamp': str(self.clock_in)}


class PaidTicket(models.Model):
    gate = models.ForeignKey(Gate, on_delete=models.CASCADE)
    clock_in = models.DateTimeField()
    clock_out = models.DateTimeField(auto_now_add=True)
    time_parked = models.IntegerField()
    amount_paid = models.IntegerField() #ALWAYS a round dollar amount
    payment_type = models.CharField(max_length=4)


class Spot(models.Model):
    area = models.ForeignKey(Area, on_delete=models.CASCADE)
    sensor_id = models.CharField(max_length=32)

class Rate(models.Model):
    rate_code = models.CharField(max_length=10)
    min_time = models.FloatField()
    max_time = models.FloatField()
    charge = models.IntegerField()
