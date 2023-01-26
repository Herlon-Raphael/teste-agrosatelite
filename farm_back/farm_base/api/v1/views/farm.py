from rest_framework import generics

from farm_base.api.v1.serializers import FarmListSerializer, \
    FarmCreateSerializer, FarmDetailSerializer
from farm_base.models import Farm
from django.shortcuts import get_object_or_404

class FarmListCreateView(generics.ListCreateAPIView):
    queryset = Farm.objects.filter(is_active=True)
    serializer_class = FarmListSerializer

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return FarmListSerializer
        else:
            return FarmCreateSerializer

    def perform_create(self, serializer):
        farm = serializer.save()
        area = float(farm.geometry.area)
        centroid = farm.geometry.centroid
        serializer.save(area=area, centroid=centroid)

    def create_farm(self, data):
        if self.request.method == 'POST':
            serializer = FarmCreateSerializer(data=data)
            if serializer.is_valid():
                farm = serializer.save()            



class FarmRetrieveUpdateDestroyView(
    generics.RetrieveUpdateDestroyAPIView):
    queryset = Farm.objects.filter(is_active=True)
    serializer_class = FarmDetailSerializer
