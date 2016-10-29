#!/usr/bin/python
#coding: utf-8

from time import sleep
from math import sqrt
import requests
import json
import RPi.GPIO as GPIO

from adxl345 import ADXL345

REST_SERVER = 'http://40.74.80.95:3000/api/v1'

PIN_BEEP = 4
PIN_STARTSW = 17

THRESHOLD = 0.3
BUF_SIZE = 15

def lowpass3d(vec_before, vec_now):
    value = {
        'x': 0,
        'y': 0,
        'z': 0
    }
    value['x'] = 0.7 * vec_before['x'] + 0.3 * vec_now['x']
    value['y'] = 0.7 * vec_before['y'] + 0.3 * vec_now['y']
    value['z'] = 0.7 * vec_before['z'] + 0.3 * vec_now['z']
    return value

def abs3d(vec):
    return sqrt(vec['x'] ** 2 + vec['y'] ** 2 + vec['z'] ** 2)

def start_eating():
    uri = REST_SERVER + '/logs'
    res = requests.post(uri).json()
    return res[u'id']

def finish_eating(eating_id, count):
    uri = REST_SERVER + '/logs/' + str(eating_id)
    headers = {
        'Content-Type': 'application/json'
    }
    payload = {
        'count': count
    }
    requests.put(uri, headers = headers, data = json.dumps(payload))

def main():
    print('program start')
    # initialize gpio
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(PIN_BEEP, GPIO.OUT)
    GPIO.setup(PIN_STARTSW, GPIO.IN, pull_up_down = GPIO.PUD_DOWN)
    # initialize accerelation sensor
    adxl345 = ADXL345()
    filtered_acc = [None for i in range(BUF_SIZE)]
    filtered_index = 0
    filtered_acc[0] = adxl345.getAxes(True)
    index = 1
    # measure
    try:
        while(True):
            if (GPIO.input(PIN_STARTSW) == 1):
                break
            else:
                sleep(0.2)
        print('いただきます！')
        try:
            eating_id = start_eating()
        except:
            print('server down?')
        hayagui_count = 0
        while(True):
            acc = adxl345.getAxes(True)
            if (index == 0):
                filtered_acc[0] = lowpass3d(filtered_acc[BUF_SIZE - 1], acc)
            else:
                filtered_acc[index] = lowpass3d(filtered_acc[index - 1], acc)
            abs_acc = abs3d(filtered_acc[index])
            if (abs_acc > (1 + THRESHOLD) or abs_acc < (1 - THRESHOLD)):
                GPIO.output(PIN_BEEP, 1)
                # TODO: ビリビリ
                hayagui_count += 1
                print('HAYAGUI NOW!')
            else:
                GPIO.output(PIN_BEEP, 0)
            # print('x: {0:.3f}'.format(filtered_acc[index]['x']))
            # print('y: {0:.3f}'.format(filtered_acc[index]['y']))
            # print('z: {0:.3f}'.format(filtered_acc[index]['z']))
            index = (index + 1) % BUF_SIZE
            sleep(0.1)
            if (GPIO.input(PIN_STARTSW) == 1):
                try:
                    print('ごちそうさまでした！')
                    finish_eating(eating_id, hayagui_count)
                except:
                    print('server down?')
                break
    finally:
        GPIO.cleanup()

if __name__ == '__main__':
    main()
