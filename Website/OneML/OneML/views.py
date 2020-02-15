from django.shortcuts import render  
#importing loading from django template  
from django.template import loader  
# Create your views here.  
from django.http import HttpResponse

from django.views.decorators.csrf import csrf_exempt
from . import settings
import time
import os
import cv2
import numpy as np
from PIL import Image
import base64  
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans

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

def DCE(request):
   template = loader.get_template('DCE.html') # getting our template  
   return HttpResponse(template.render())  



@csrf_exempt
@csrf_exempt

def save_image(request):

    print("main hu yaha")
    settings.MEDIA_ROOT + '/webcamimages/someimage.jpg'
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
        print(x)
        t = base64.b64decode(x)
        f = open(settings.MEDIA_ROOT + '/webcamimages/someimage.jpg', 'wb')
        f.write(t)
        f.close()
        print('new image has been uploaded')
        img=cv2.imread(settings.MEDIA_ROOT + '/webcamimages/someimage.jpg')

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
        f = open(settings.MEDIA_ROOT + '/webcamimages/output.jpg', 'wb')
        
        cv2.imwrite(settings.MEDIA_ROOT +'/webcamimages/output.jpg',np.asarray(bkg))
        
        print('image has been posted')
        
        return HttpResponse("200 ")
    else:
        return HttpResponse('no data bata')




class Segmentation:
    
    def __init__(self,image,dom_colors):
        #since cv2 reads image in BGR mode , it is necessary to convert into RGB mode.
        self.image=cv2.cvtColor(image,cv2.COLOR_BGR2RGB)
        self.orginal_size=image.shape
        #flatenning the image in order to make it compatible for KMeans class
        self.pixel_array=self.image.reshape((-1,3))
        self.dom_colors=dom_colors
        #Created an instance of KMeans 
        self.km=KMeans(n_clusters=self.dom_colors)
        #created a model here
        self.km.fit(self.pixel_array)
           
    #this program helps to extract out the dominant colors from the image    
    def dominant_colors(self):
        #taking out the centers
        self.centers=np.array(self.km.cluster_centers_,dtype='uint8')
        self.colors=[]
        plt.figure(0,(4,4))
        var=1
        for current_center in self.centers:
            plt.subplot(1,self.dom_colors+1,var)
            plt.subplots_adjust(wspace=2)
            plt.gca().set_title(str(var),fontsize=8)
            plt.axis("off")
            self.colors.append(current_center)
            #created an array to store data of each dominant color
            color_array=np.zeros((100,100,3),dtype='uint8')
            color_array[:,:,:]=current_center
            plt.imshow(color_array)
            var+=1
        plt.show()
        
    #this fucntion draws the image with the given dominant colors
    def draw_image(self):
        self.centers=np.array(self.km.cluster_centers_,dtype='uint8')
        #here predict function gives label to each point , i.e the given point is nearer to which center
        pred=self.km.predict(self.pixel_array)
        #creaed an empty array to store data of image 
        new_image=np.zeros((self.image.shape[0]*self.image.shape[1],3),dtype='uint8')
        for i in range(new_image.shape[0]):
            new_image[i]=self.centers[pred[i]]
        #new_image is reshaped into original size in order to get whole image together
        new_image=new_image.reshape(self.orginal_size)
        plt.axis("off")
        plt.title("No. of colors : "+str(self.dom_colors))
        plt.imshow(new_image)
        plt.show()


def DCE_image(request):
   if request.method == 'POST':
        # save it somewhere
        print(settings.MEDIA_ROOT + '/webcamimages/DCEinput.jpg')
        if os.path.exists(os.path.join(settings.MEDIA_ROOT ,'webcamimages/DCEinput.jpg')):
            os.remove(os.path.join(settings.MEDIA_ROOT ,'webcamimages/DCEinput.jpg'))
            print("delete th previous image")
        if os.path.exists(os.path.join(settings.MEDIA_ROOT ,'webcamimages/DCEoutput.jpg')):  
            os.remove(os.path.join(settings.MEDIA_ROOT , 'webcamimages/DCEoutput.jpg'))
            print("delete th previous image")

        x = request.body
        x=x[23:]
        print(x)
        t = base64.b64decode(x)
        f = open(settings.MEDIA_ROOT + '/webcamimages/DCEinput.jpg', 'wb')
        f.write(t)
        f.close()
        print('new image has been uploaded')
        img=cv2.imread(settings.MEDIA_ROOT + '/webcamimages/DCEinput.jpg')