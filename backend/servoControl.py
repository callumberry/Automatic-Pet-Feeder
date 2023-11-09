import RPi.GPIO as GPIO
import time



def move_servo_min_to_max():
    GPIO.setmode(GPIO.BCM)

    servo_pin = 17
    GPIO.setup(servo_pin, GPIO.OUT)
    
    pwm = GPIO.PWM(servo_pin, 50) 
    pwm.start(2.5)
    
    pwm.ChangeDutyCycle(2.5)
    time.sleep(1)

    pwm.ChangeDutyCycle(12.5)
    time.sleep(1)

    pwm.stop()

    GPIO.cleanup()



