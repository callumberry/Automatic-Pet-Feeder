import RPi.GPIO as GPIO
import time

def tryGetEncoderData():
    GPIO.setmode(GPIO.BCM)

    # Define the GPIO pins used for CLK, DT, and SW.
    CLK_PIN = 22  # Change to the actual GPIO pin you connected the CLK pin to.
    DT_PIN = 18   # Change to the actual GPIO pin you connected the DT pin to.
    SW_PIN = 27   # Change to the actual GPIO pin you connected the SW pin to.

    

    # Initialize the GPIO pins as inputs with pull-up resistors.
    GPIO.setup(CLK_PIN, GPIO.IN, pull_up_down=GPIO.PUD_UP)
    GPIO.setup(DT_PIN, GPIO.IN, pull_up_down=GPIO.PUD_UP)
    GPIO.setup(SW_PIN, GPIO.IN, pull_up_down=GPIO.PUD_UP)

    # Initialize variables to keep track of the encoder state and button state.
    clk_last_state = GPIO.input(CLK_PIN)
    sw_last_state = GPIO.input(SW_PIN)

    initalPosVal = open("./data/encoderData.txt", "r").read()
    pos = int(initalPosVal)

    timesToWrite = open("./data/feedTimes.txt", "r").read()
    timesArray = timesToWrite.split(',')
    timeOneToWrite = timesArray[0]
    timeTwoToWrite = timesArray[1]

    timeOneArray = timesArray[0].split(':')
    timeTwoArray = timesArray[1].split(':')
 
    timeOne = int(timeOneArray[0])
    timeTwo = int(timeTwoArray[0])


    option = ['Portion', 'Time One', 'Time Two']
    selection = 'Portion'

    try:
        while True:
            clk_state = GPIO.input(CLK_PIN)
            sw_state = GPIO.input(SW_PIN)

            # Check for button press
            if sw_state == 1 and sw_last_state == 0:
                if(selection == option[0]):
                    selection = option[1]
                elif(selection == option[1]):
                    selection = option[2]
                elif(selection == option[2]):
                    selection = option[0]
                

            # Check for encoder rotation
            if clk_state != clk_last_state:
                if GPIO.input(DT_PIN) != clk_state:
                    if(selection == option[0]):
                        pos -= 1
                    elif(selection == option[1]):
                        timeOne -= 1
                        timeOneToWrite = str(timeOne) + ":00"
                    elif(selection == option[2]):
                        timeTwo -= 1
                        timeTwoToWrite = str(timeTwo) + ":00   "
                    

                else:
                    if(selection == option[0]):
                        pos += 1
                    elif(selection == option[1]):
                        timeOne += 1
                        timeOneToWrite = str(timeOne) + ":00"
                    elif(selection == option[2]):
                        timeTwo += 1
                        timeTwoToWrite = str(timeTwo) + ":00   "

                if(selection == option[0]):
                    with open("./data/encoderData.txt", "w") as file:
                        file.write(str(pos)) 
                    print(pos)
                elif((selection == option[1]) | (selection == option[2])):
                    timesToWrite = timeOneToWrite + ',' + timeTwoToWrite
                    with open("./data/feedTimes.txt", "w") as file:
                        file.write(str(timesToWrite)) 
                    print(timesToWrite)

            clk_last_state = clk_state
            sw_last_state = sw_state

            time.sleep(0.01)  # Adjust the delay as needed

    except KeyboardInterrupt:
        GPIO.cleanup()
