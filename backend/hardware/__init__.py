import threading

from .servoControl import move_servo_min_to_max
from .ledControl import toggle_led
from .stepper import move_stepper_motor
from .lcd import tryWriteToLCD
from .analog import tryGetAnalog
from .encoder import tryGetEncoderData
from .ultrasonic import tryGetUltrasonicData

encoderThread = threading.Thread(target=tryGetEncoderData,  daemon=True)
analogThread = threading.Thread(target=tryGetAnalog,  daemon=True)
lcdThread = threading.Thread(target=tryWriteToLCD,  daemon=True)
ultrasonicThread = threading.Thread(target=tryGetUltrasonicData,  daemon=True)
encoderThread.start()
analogThread.start()
lcdThread.start()
ultrasonicThread.start()
