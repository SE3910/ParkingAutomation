from threading import Thread
import random
import json
import http.client
import sys
import time

TIME_MULT=0.01

class Car(Thread):
    def __init__(self, url):
        super(Car, self).__init__()
        self.ticket = None
        self.url = url
        self.duration = random.randint(360000, 5000000)/1000*TIME_MULT # seconds

    def run(self):
        conn = http.client.HTTPConnection(url)
        conn.request("GET", "/api/gate/?action=enter")
        r = conn.getresponse()
        data = r.read()
        print(r.status, r.reason)

        # parse the json for our ticket id and spot then notify that we took the spot and sleep our millis
        parsed = json.loads(data.decode('utf-8'))
        self.ticket = parsed['ticketId'] 
        spot = '0'
       
        print("Got ticket "+self.ticket+" parking in "+spot+" for "+str(self.duration)+" seconds")
 
        #conn.request("GET", "/api/gate/?spot=take&id="+spot)
        #conn.getresponse()
        conn.close()

        time.sleep(self.duration)
        
        # attempt an exit
        print("Ticket "+self.ticket+" exiting")
        conn = http.client.HTTPConnection(url)
        conn.request("GET", "/api/gate/?action=exit&ticketId="+self.ticket)
        r = conn.getresponse()
        print(r.status, r.reason)
        conn.close()
        print("car left")


random.seed()
url = '127.0.0.1:8000' # default to Django default
cars = []
count = 0

print(str(sys.argv))

if len(sys.argv) > 2:
    url = sys.argv[1]
    count = int(sys.argv[2])
else:
    count = int(sys.argv[1])

for i in range(count):
    car = Car(url)
    cars.append(car)
    car.start()        # start the car. >_>
    time.sleep(random.randint(50, 250)*TIME_MULT)

# be a good OS citizen
for c in cars:
    c.join()
