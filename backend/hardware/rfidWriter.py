from time import sleep
import sys
from mfrc522 import SimpleMFRC522
import RPi.GPIO as GPIO

reader = SimpleMFRC522()

try:
    print("Print data here: ")
    uid, text = reader.read()

    dataToWrite = input("Put input here: ")

    reader.write(dataToWrite)
    print("Data written")

except KeyboardInterrupt:
    GPIO.cleanup()
    raise