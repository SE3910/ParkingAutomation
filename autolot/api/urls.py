from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('gate/', views.gate, name='gate'),
    path('rates/', views.rates, name='rates'),
    path('paid/', views.paid, name='paid'),
]
