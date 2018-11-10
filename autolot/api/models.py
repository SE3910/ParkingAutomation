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
        p = t.pay(self, 'CC')
        t.delete()
        return p

    def available(self):
        return self.total_spots - self.ticket_set.count()

    def json(self):
        return {'name': self.name, 'active': 'true' if self.active else 'false', 'totalSpots': str(self.total_spots), 'tickets': [t.json() for t in self.ticket_set.all()], 'rates': [r.json() for r in self.rate_set.all()]}
        

class Area(models.Model):
    gate = models.ForeignKey(Gate, on_delete=models.CASCADE)
    name = models.CharField(max_length=32)
    total_spots = models.IntegerField(default=1)

    def json(self):
        avail = 0
        for s in self.spot_set.all():
            if not s.taken:
                avail = avail + 1
        return {'name': self.name, 'totalSpots': str(self.total_spots), 'availableSpots': str(avail)}


class Ticket(models.Model):
    gate = models.ForeignKey(Gate, on_delete=models.CASCADE)
    clock_in = models.DateTimeField(auto_now_add=True)

    def calculate_charge(self, time_out):
        a = d-self.clock_in 
        dur = a.total_seconds() / 3600  # Rate understands duration in hours
        r = Rate.objects.filter(min_time__lte=dur).order_by('-min_time').first()
        return r.charge * dur

    def pay(self, gate, payment_type):
        d = datetime.datetime.now(self.clock_in.tzinfo) # I'm so horrible
        charge = self.calculate_charge(d)
        p = PaidTicket(id=self.id, gate=gate, clock_in = self.clock_in, time_parked = dur, amount_paid=charge, payment_type=payment_type)
        p.save()
        return p

    def json(self):
        return {'ticketId': str(self.id), 'timestamp': str(self.clock_in)}


class PaidTicket(models.Model):
    gate = models.ForeignKey(Gate, on_delete=models.CASCADE)
    clock_in = models.DateTimeField()
    clock_out = models.DateTimeField(auto_now_add=True)
    time_parked = models.FloatField()
    amount_paid = models.IntegerField() #ALWAYS a round dollar amount
    payment_type = models.CharField(max_length=4)

    def json(self):
        return {'clockIn': str(self.clock_in), 'clockOut': str(self.clock_out), 'timeParked': str(self.time_parked*60), 'amountPaid': str(self.amount_paid), 'paymentType': self.payment_type}


class Spot(models.Model):
    area = models.ForeignKey(Area, on_delete=models.CASCADE)
    sensor_id = models.CharField(max_length=32)
    taken = models.BooleanField(default=False)

class Rate(models.Model):
    gate = models.ForeignKey(Gate, on_delete=models.CASCADE)
    rate_code = models.CharField(max_length=10)
    min_time = models.FloatField()
    max_time = models.FloatField()
    charge = models.IntegerField()

    def json(self):
        return {'rateCode': self.rate_code, 'minTime': str(self.min_time), 'maxTime': str(self.max_time), 'charge': str(self.charge)}


