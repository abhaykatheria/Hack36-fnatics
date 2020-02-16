from django.shortcuts import render  
from django.http import HttpResponse  
from upload.functions.functions import handle_uploaded_file  
from upload.forms import StudentForm  
def index(request):  
    if request.method == 'POST':
        student = StudentForm(request.POST, request.FILES)  
        if student.is_valid():  
            handle_uploaded_file(request.FILES['file'])  
            return HttpResponse("File uploaded successfuly")  
    else:  
        student = StudentForm()  
        return render(request,"test_upload.html",{'form':student})      
