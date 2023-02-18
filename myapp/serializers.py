from rest_framework import serializers
from .models import MyList

class MyListSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyList
        fields = ('id','title','description','completed')