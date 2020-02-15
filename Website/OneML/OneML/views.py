from django.shortcuts import render  
#importing loading from django template  
from django.template import loader  
# Create your views here.  
from django.http import HttpResponse  

def index(request):  
   template = loader.get_template('index.html') # getting our template  
   return HttpResponse(template.render())

def linearRegression(request):  
   template = loader.get_template('LR.html') # getting our template  
   return HttpResponse(template.render())

def imageClassification(request):  
   template = loader.get_template('IC.html') # getting our template  
   return HttpResponse(template.render())

def nlpVisuliser(request):  
   template = loader.get_template('NLP.html') # getting our template  
   return HttpResponse(template.render())  
