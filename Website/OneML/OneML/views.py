from django.shortcuts import render  
#importing loading from django template  
from django.template import loader  
# Create your views here.  
from django.http import HttpResponse

from django.views.decorators.csrf import csrf_exempt
from . import settings

import os
import cv2
import numpy as np
from PIL import Image
import base64  

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

def thug(request):
   template = loader.get_template('thug.html') # getting our template  
   return HttpResponse(template.render())  


def save_image(request):
    if request.method == 'POST':
        # save it somewhere
        if os.path.exists(settings.MEDIA_ROOT + '/webcamimages/someimage.jpg'):
            os.remove(settings.MEDIA_ROOT + '/webcamimages/someimage.jpg')
            print("delete th previous image")
        if os.path.exists(settings.MEDIA_ROOT + '/webcamimages/output.jpg'):  
            os.remove(settings.MEDIA_ROOT + '/webcamimages/output.jpg')
            print("delete th previous image")

        x = request.body
        x=x[23:]
        t = base64.b64decode(x)
        print("delete th previous image")
        
        
        f = open(settings.MEDIA_ROOT + '/webcamimages/someimage.jpg', 'wb')
        
        f.write(t)
        f.close()
        
        print('new image has been uploaded')
        img=cv2.imread(settings.MEDIA_ROOT + '/webcamimages/someimage.jpg')
        #print(img)
        #
        thug = Image.open(settings.MEDIA_ROOT + '/webcamimages/mask.png' )
        face_cascade = cv2.CascadeClassifier(settings.MEDIA_ROOT + "/haarcascade_frontalface_alt.xml")
        gray = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
        face=face_cascade.detectMultiScale(gray,1.3,5)
        bkg = Image.fromarray(img)
        for (x,y,w,h) in face:
            #here we resize the thug mask according to the detected face.
            new_thug = thug.resize((w,h) , Image.ANTIALIAS)
            #now the thug mask is being pasted on the detected face .
            bkg.paste(new_thug , (x,y), mask = new_thug)
        print("foto bn vyi hao")
        cv2.imwrite(settings.MEDIA_ROOT +'/webcamimages/output.jpg',np.asarray(bkg))
        print('image has been posted')
        '''response = HttpResponse()
        response.write()'''
        # return the URL
        '''return HttpResponse("""<script> 
            document.getElementById('bigpic').src = "";
            var pic = "site_media/webcamimages/output.jpg";
            document.getElementById('bigpic').src = pic;
            console.log("main heroine hu");
            document.getElementById('bigpic').style.display = 'block';
            </script>""")'''
        #return HttpResponse('http://localhost:8000/site_media/webcamimages/output.jpg')
        '''return HttpResponse('http://localhost:8000/site_media/webcamimages/someimage.jpg')'''
    else:
        return HttpResponse('no data bata')