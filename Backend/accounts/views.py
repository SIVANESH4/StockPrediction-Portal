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
from .utils import save_plot
from sklearn.preprocessing import MinMaxScaler
from keras.models import load_model
from sklearn.metrics import mean_squared_error, r2_score


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

            #Plotting the close price of the stock for the last 10 years
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
            plot_img = save_plot(plot_img_path)
            print(plot_img)

            #Plottinh for 100days Moving Average
            ma100 = df.Close.rolling(100).mean()
            plt.switch_backend('AGG')
            plt.figure(figsize=(12, 5))
            plt.plot(df.Close, label='Closing Price')
            plt.plot(ma100, 'r', label='100 DMA')
            plt.title(f'100 Days Moving Average of {ticker}')
            plt.xlabel('Days')
            plt.ylabel('Price')
            plt.legend()
            plot_img_path = f'{ticker}_100_dma.png'
            plot_100_dma = save_plot(plot_img_path)

            #plotting for 200days Moving Average
            ma200 = df.Close.rolling(200).mean()
            plt.switch_backend('AGG')
            plt.figure(figsize=(12, 5))
            plt.plot(df.Close, label='Closing Price')
            plt.plot(ma100, 'r', label='100 DMA')
            plt.plot(ma200, 'g', label='200 DMA')
            plt.title(f'200 Days Moving Average of {ticker}')
            plt.xlabel('Days')
            plt.ylabel('Price')
            plt.legend()
            plot_img_path = f'{ticker}_200_dma.png'
            plot_200_dma = save_plot(plot_img_path)

            #Prepare and Predict data for LSTM
            data_training = pd.DataFrame(df.Close[0:int(len(df)*0.7)])
            data_testing = pd.DataFrame(df.Close[int(len(df)*0.7) : int(len(df))])
            scaler = MinMaxScaler(feature_range=(0,1))
            model = load_model('StockPredictionModelResult.keras')
            past_100_days = data_training.tail(100)
            final_df = pd.concat([past_100_days,data_testing], ignore_index = True)
            input_data = scaler.fit_transform(final_df)
            x_test = []
            y_test = []
            for i in range(100, input_data.shape[0]):
                x_test.append(input_data[i-100: i])
                y_test.append(input_data[i, 0])
            x_test, y_test = np.array(x_test), np.array(y_test)
            y_predicted = model.predict(x_test)
            y_predicted = scaler.inverse_transform(y_predicted.reshape(-1,1)).flatten()
            y_test = scaler.inverse_transform(y_test.reshape(-1,1)).flatten()

            #Plotting the predicted vs actual price
            plt.switch_backend('AGG')
            plt.figure(figsize=(12, 5))
            plt.plot(y_test, label='Actual Price')
            plt.plot(y_predicted, label='Predicted Price')
            plt.title(f'{ticker} Predicted vs Actual Price')
            plt.xlabel('Days')
            plt.ylabel('Price')
            plt.legend()
            plot_img_path = f'{ticker}_predicted.png'
            plot_predicted = save_plot(plot_img_path)

            #model Evaluation
            mse = mean_squared_error(y_test, y_predicted)
            rmse = np.sqrt(mse)
            r2 = r2_score(y_test, y_predicted)

            return Response({'status': 'Success',
                            'plot_img': plot_img,
                            'plot_100_dma': plot_100_dma,
                            'plot_200_dma': plot_200_dma,
                            'plot_predicted': plot_predicted,
                            'mse': mse,
                            'rmse': rmse,
                            'r2': r2})