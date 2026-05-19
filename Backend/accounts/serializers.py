from rest_framework import serializers
from .models import User_table

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})
    class Meta:
        model = User_table
        fields = ['id', 'username', 'email', 'password']