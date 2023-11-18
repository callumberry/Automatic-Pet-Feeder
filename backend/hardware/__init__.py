import threading

from .servoControl import move_servo_min_to_max
from .ledControl import toggle_led
from .stepper import move_stepper_motor
from .lcd import tryWriteToLCD
from .analog import tryGetAnalog
from .encoder import tryGetEncoderData
from .ultrasonic import tryGetUltrasonicData

encoderThread = threading.Thread(target=tryGetEncoderData)
analogThread = threading.Thread(target=tryGetAnalog)
lcdThread = threading.Thread(target=tryWriteToLCD)
ultrasonicThread = threading.Thread(target=tryGetUltrasonicData)
encoderThread.start()
analogThread.start()
lcdThread.start()
ultrasonicThread.start()
