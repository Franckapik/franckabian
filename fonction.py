#! /usr/bin/python
import time
import RPi.GPIO as GPIO ## Import de la librairie obligatoire GPIO 

GPIO.setmode(GPIO.BCM) ## Utilisation de la numerotation de la carte GPIO
GPIO.setup(5, GPIO.OUT) ## Selection du pin 5

def op(x):
    GPIO.output(5,x) ## Definition de la fonction generale output

