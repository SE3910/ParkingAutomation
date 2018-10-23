from django.http import HttpResponse, JsonResponse
from .models import Ticket, Gate
from .lib import TransactionHandler

def index(request):
    return HttpResponse("API is here. Usually you will want /api/XXXX/?args=YYYY")


def gate(request):
    action = request.GET.get('action', 'info')
    gate = Gate.objects.get(pk=request.GET.get('id', '1'))
    if action == 'enter':
        t = gate.enter()
        return JsonResponse(t.json())
    elif action == 'exit':
        gate = Gate.objects.get(pk=request.GET.get('id', '1'))
        ticket = Ticket.objects.get(pk=request.GET.get('ticketid'))
        paid = gate.exit(ticket)
        j = paid.json()
        j['status'] = 'success'
        return JsonResponse(j)
    elif action == 'available':
        gate = Gate.objects.get(pk=request.GET.get('id', '1'))
        j = gate.json()
        j['available'] = gate.available()
        return JsonResponse(j)
    return JsonResponse(gate.json())

