from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, permissions
from .models import Project
from .serializers import *
from rest_framework.response import Response

# Create your views here.

# def home(request):
#     return HttpResponse("This is a home page")

class ProjectViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def list(self, request):
        queryset = self.queryset #bring all Project objects
        serializer = self.serializer_class(queryset, many=True) #Translate to the front-end
        return Response(serializer.data) #send the data to the client

    def create(self, request):
        serializer = self.serializer_class(data=request.data) #translate the data to django
        if serializer.is_valid(): 
            serializer.save()
            return Response(serializer.data) #if the data is valid , save it
        else:
            return Response(serializer.errors, status=400) # else return error

    def retrieve(self, request, pk=None):
        project = self.queryset.get(pk=pk) #bring the object of the requested primary key
        serializer = self.serializer_class(project) #translate it for front-end
        return Response(serializer.data) #send the data to the client

    def update(self, request, pk=None):
        project = self.queryset.get(pk=pk) #bring the object of the requested primary key
        serializer = self.serializer_class(project, data=request.data) #translate both, the data from database and from the client
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)#if the data is valid , save it
        else :
            return Response(serializer.errors, status=400)# else return error

    def destroy(self, request, pk=None):
        project = self.queryset.get(pk=pk)
        project.delete()
        return Response(status=204)