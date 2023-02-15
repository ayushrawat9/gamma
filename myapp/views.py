from django.shortcuts import render
from rest_framework import viewsets
from .serializers import MyListSerializer
from .models import MyList

# Create your views here.

class MyListView(viewsets.ModelViewSet):
    serializer_class = MyListSerializer
    queryset = MyList.objects.all()