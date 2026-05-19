from django.shortcuts import render
from rest_framework import generics
from .serializers import UserSerializer
from .models import User_table

# Create your views here.
class RegisterView(generics.CreateAPIView):
    queryset = User_table.objects.all()
    serializer_class = UserSerializer