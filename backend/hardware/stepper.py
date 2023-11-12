import RPi.GPIO as GPIO
import time

# Define pin connections & motor's steps per revolution
dirPin = 15
stepPin = 18
stepsPerRevolution = 200
delay = 0.001
# Set up GPIO mode


def move_stepper_motor():
    GPIO.setmode(GPIO.BCM)

# Set up GPIO pins as outputs
    GPIO.setup(stepPin, GPIO.OUT)
    GPIO.setup(dirPin, GPIO.OUT)
    # Set motor direction clockwise
    GPIO.output(dirPin, GPIO.HIGH)

    for _ in range(stepsPerRevolution):
        GPIO.output(stepPin, GPIO.HIGH)
        time.sleep(delay)
        GPIO.output(stepPin, GPIO.LOW)
        time.sleep(delay)

    # Set motor direction counterclockwise
    GPIO.output(dirPin, GPIO.LOW)
    time.sleep(1) 
    for _ in range(stepsPerRevolution):
        GPIO.output(stepPin, GPIO.HIGH)
        time.sleep(delay)
        GPIO.output(stepPin, GPIO.LOW)
        time.sleep(delay)

    GPIO.cleanup()     



