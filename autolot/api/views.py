from django.http import HttpResponse, JsonResponse
from .models import Ticket, Gate
from .lib import TransactionHandler

def index(request):
    return HttpResponse("API is here. Usually you will want /api/XXXX/?args=YYYY")


def gate(request):
    action = request.GET.get('action', 'info')
    gate = Gate.objects.get(pk=request.GET.get('id', '1'))
    if action == 'enter':
        ticket = Ticket(gate=gate)
        ticket.save()
        return JsonResponse({'ticketId': str(ticket.id), 'timestamp': str(ticket.clock_in)})
    elif action == 'exit':
        ticket = Ticket.objects.get(pk=request.GET.get('ticketid'))
    return JsonResponse({'id': str(gate.id), 'name': gate.name, 'total_spots': str(gate.total_spots)})

