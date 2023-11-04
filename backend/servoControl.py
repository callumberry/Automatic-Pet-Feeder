import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)

servo_pin = 17
GPIO.setup(servo_pin, GPIO.OUT)

def move_servo_min_to_max():
    pwm = GPIO.PWM(servo_pin, 50) 
    pwm.start(2.5)
    try:
        pwm.ChangeDutyCycle(2.5)
        time.sleep(1)

        pwm.ChangeDutyCycle(12.5)
        time.sleep(1)

        pwm.stop()

    except KeyboardInterrupt:
        pwm.stop()
        GPIO.cleanup()



