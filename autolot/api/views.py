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
        j = t.json()
        j['status'] = 'success'
        return JsonResponse(j)
    elif action == 'exit':
        gate = Gate.objects.get(pk=request.GET.get('id', '1'))
        ticket = Ticket.objects.get(pk=request.GET.get('ticketId'))
        paid = gate.exit(ticket)
        j = paid.json()
        j['status'] = 'success'
        return JsonResponse(j)
    elif action == 'available':
        gate = Gate.objects.get(pk=request.GET.get('id', '1'))
        return JsonResponse({'available': str(gate.available())})
    return JsonResponse(gate.json())


def rates(request):
    ret = {}
    action = request.GET.get('action', 'info')
    if action == 'add':
        r = Rate(gate=Gate.objects.get(pk=request.GET.get('gate', '1')), 
                 rate_code=request.GET.get('rate_code'),
                 min_time=request.GET.get('min_time'),
                 max_time=request.GET.get('max_time'),
                 charge=request.GET.get('charge'))
        r.save()
        ret = r.json()
        ret['status']='success'
    return JsonResponse(ret)

