from django.urls import path
from . import views

urlpatterns = [
    path('', views.RegisterView.as_view()),
    path('predict/',views.StockPredictionView.as_view()),
]