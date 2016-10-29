#!/usr/bin/python
#coding: utf-8

from time import sleep
from math import sqrt
from pprint import pprint

from adxl345 import ADXL345

THRESHOLD = 0.5
BUF_SIZE = 127

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

def main():
    adxl345 = ADXL345()
    plain_acc = [None for i in range(BUF_SIZE)]
    plain_index = 0
    filtered_acc = [None for i in range(BUF_SIZE)]
    filtered_index = 0
    # initialize
    filtered_acc[0] = adxl345.getAxes(True)
    pprint(filtered_acc[0])
    index = 1
    # measure
    while(True):
        acc = adxl345.getAxes(True)
        if (index == 0):
            filtered_acc[0] = lowpass3d(filtered_acc[BUF_SIZE - 1], acc)
        else:
            filtered_acc[index] = lowpass3d(filtered_acc[index - 1], acc)
        print('abs: {0:.3f}'.format(abs3d(filtered_acc[index])))
        # print('x: {0:.3f}'.format(filtered_acc[index]['x']))
        # print('y: {0:.3f}'.format(filtered_acc[index]['y']))
        # print('z: {0:.3f}'.format(filtered_acc[index]['z']))
        index = (index + 1) % BUF_SIZE
        sleep(0.3)

if __name__ == '__main__':
    main()
