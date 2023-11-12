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
            # Remember that your sentences can only be 16 characters long!
            # print("Writing to display")
            selectedData = open("./data/encoderData.txt", "r")
            feedTimes = open("./data/feedTimes.txt", "r")

            display.lcd_display_string("Portions:", 1)   # Refresh the first line of display with a different message
            display.lcd_display_string(selectedData.read(), 2)  # Write line of text to second line of display
            sleep(4)                                           # Give time for the message to be read
            display.lcd_clear()                                # Clear the display of any data
            display.lcd_display_string("Feed Times: ", 1)
            display.lcd_display_string(feedTimes.read(), 2)
            sleep(4)  
            display.lcd_clear()                                          # Give time for the message to be read

    except KeyboardInterrupt:
        # If there is a KeyboardInterrupt (when you press ctrl+c), exit the program and cleanup
        print("Cleaning up!")
        display.lcd_clear()
