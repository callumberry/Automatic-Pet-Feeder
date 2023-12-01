#! /usr/bin/env python

# Simple string program. Writes and updates strings.
# Demo program for the I2C 16x2 Display from Ryanteck.uk
# Created by Matthew Timmons-Brown for The Raspberry Pi Guy YouTube channel

# Import necessary libraries for communication and display use
from .drivers import Lcd
from time import sleep
from datetime import datetime

# Load the driver and set it to "display"
# If you use something from the driver library use the "display." prefix first
def tryWriteToLCD():
    display = Lcd()

    # Main body of code
    try:
        while True:
            selectedData = open("./data/encoderData.txt", "r")
            portionsData = "Portions: " + selectedData.read() + "    "

            timeData = open("./data/feedTimes.txt", "r")
            feedTimes = "FT: " + timeData.read()

            display.lcd_display_string(portionsData, 1)
            display.lcd_display_string(feedTimes, 2)
            
            # display.lcd_clear()                                      

    except KeyboardInterrupt:
        # If there is a KeyboardInterrupt (when you press ctrl+c), exit the program and cleanup
        print("Cleaning up!")
        display.lcd_clear()
