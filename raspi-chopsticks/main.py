#!/usr/bin/python
#coding: utf-8

from time import sleep
from math import sqrt

from adxl345 import ADXL345

THRESHOLD = 0.5

def main():
    adxl345 = ADXL345()
    while (True):
        axes = adxl345.getAxes(True)
        # print 'ADXL345 on address 0x%x:' % (adxl345.address)
        abs_acce = (sqrt(axes['x'] ** 2 + axes['y'] ** 2 + axes['z'] ** 2))
        print('--------------------')
        print('abs: {}'.format(abs_acce))
        print('x: {}'.format(axes['x']))
        print('y: {}'.format(axes['y']))
        print('z: {}'.format(axes['z']))
        sleep(1)

if __name__ == '__main__':
    main()
