import RPi.GPIO as GPIO
import time

# Set the GPIO mode
GPIO.setmode(GPIO.BCM)

# Define the rows and columns of the keypad
rows = [25, 8, 7, 5]  # Change these GPIO pin numbers to match your wiring
columns = [6, 13, 18, 23]  # Change these GPIO pin numbers to match your wiring

# Define the keys on the keypad
keys = [
    ['1', '2', '3', 'A'],
    ['4', '5', '6', 'B'],
    ['7', '8', '9', 'C'],
    ['*', '0', '#', 'D']
]

# Set up the GPIO pins for the rows as input with pull-up resistors
for row in rows:
    GPIO.setup(row, GPIO.IN, pull_up_down=GPIO.PUD_UP)

# Set up the GPIO pins for the columns as output
for col in columns:
    GPIO.setup(col, GPIO.OUT)
    GPIO.output(col, GPIO.HIGH)

# Function to read the keypad
def read_key():
    key = None
    for col in columns:
        GPIO.output(col, GPIO.LOW)
        for row in rows:
            if GPIO.input(row) == GPIO.LOW:
                key = keys[rows.index(row)][columns.index(col)]
        GPIO.output(col, GPIO.HIGH)
    return key

try:
    while True:
        key = read_key()
        if key:
            print(f'Key Pressed: {key}')
        time.sleep(0.1)

except KeyboardInterrupt:
    pass

finally:
    GPIO.cleanup()
