from django.shortcuts import render
from matplotlib import ticker
from rest_framework import generics
from django.contrib.auth.models import User
import os
from django.conf import settings
from .serializers import StockPredictionSerializer, UserSerializer
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import yfinance as yf
from datetime import datetime
from sklearn.preprocessing import MinMaxScaler

# Create your views here.
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class StockPredictionView(APIView):
    def post(self, request):
        serializer = StockPredictionSerializer(data=request.data)
        if serializer.is_valid():
            ticker = serializer.validated_data['ticker']

            current = datetime.now()
            start = datetime(current.year - 10, current.month, current.day)
            end = current
            df = yf.download(ticker, start, end)
            if df.empty:
                return Response({'status': 'Error', 'message': 'Invalid ticker symbol'}, status=400)
            
            df = df.reset_index()
            plt.switch_backend('AGG')
            plt.figure(figsize=(12,5))
            plt.plot(df.Close)
            plt.title(f'{ticker} Close Price')
            plt.xlabel('Days')
            plt.ylabel('Close_Price')
            plot_img_path = f'{ticker}_plot.png'
            image_path = os.path.join(settings.MEDIA_ROOT, plot_img_path)
            plt.savefig(image_path)
            plt.close()
            img_url = settings.MEDIA_URL + plot_img_path
            print(img_url)
            return Response({'status': 'Success', 'ticker': ticker})