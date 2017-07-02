#!/usr/bin/python
# -*- coding: utf-8 -*-

import RPi.GPIO as GPIO
import time
import sys, json

GPIO.setmode(GPIO.BCM)

Trig = 17  # Entree Trig du HC-SR04 branchee au GPIO 4
Echo = 27  # Sortie Echo du HC-SR04 branchee au GPIO 5

GPIO.setwarnings(False)

GPIO.setup(Trig, GPIO.OUT)

GPIO.setup(Echo, GPIO.IN)

GPIO.output(Trig, False)

for x in range(5):  # On prend la mesure 5 fois

    time.sleep(1)  # On la prend toute les 1 seconde

    GPIO.output(Trig, True)
    time.sleep(0.00001)
    GPIO.output(Trig, False)

    while GPIO.input(Echo) == 0:  # Emission de l'ultrason
        debutImpulsion = time.time()

    while GPIO.input(Echo) == 1:  # Retour de l'Echo
        finImpulsion = time.time()

    distance = round((finImpulsion - debutImpulsion) * 340 *
                     100 / 2, 1)  # Vitesse du son = 340 m/s

    print distance


GPIO.cleanup()

