import RPi.GPIO as GPIO
import time


def tryGetEncoderData():
    GPIO.setmode(GPIO.BCM)

    # Define the GPIO pins used for CLK, DT, and SW.
    CLK_PIN = 22  # Change to the actual GPIO pin you connected the CLK pin to.
    DT_PIN = 18   # Change to the actual GPIO pin you connected the DT pin to.
    SW_PIN = 27   # Change to the actual GPIO pin you connected the SW pin to.

    pos = 0

    # Initialize the GPIO pins as inputs with pull-up resistors.
    GPIO.setup(CLK_PIN, GPIO.IN, pull_up_down=GPIO.PUD_UP)
    GPIO.setup(DT_PIN, GPIO.IN, pull_up_down=GPIO.PUD_UP)
    GPIO.setup(SW_PIN, GPIO.IN, pull_up_down=GPIO.PUD_UP)

    # Initialize variables to keep track of the encoder state and button state.
    clk_last_state = GPIO.input(CLK_PIN)
    sw_last_state = GPIO.input(SW_PIN)

    try:
        while True:
            clk_state = GPIO.input(CLK_PIN)
            sw_state = GPIO.input(SW_PIN)

            # Check for button press
            if sw_state == 1 and sw_last_state == 0:
                pickedVal = pos
                # print("Button Pressed")
                print("You picked", pickedVal, "units")
                
                with open("./data/encoderData.txt", "w") as file:
                    file.write(str(pickedVal))

            # Check for encoder rotation
            if clk_state != clk_last_state:
                if GPIO.input(DT_PIN) != clk_state:
                    # print("Counterclockwise")
                    pos -= 1

                else:
                    # print("Clockwise")
                    pos +=1

                print(pos)

            clk_last_state = clk_state
            sw_last_state = sw_state

            time.sleep(0.01)  # Adjust the delay as needed

    except KeyboardInterrupt:
        GPIO.cleanup()
