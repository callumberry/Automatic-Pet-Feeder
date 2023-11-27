from gpiozero import MCP3008
import time

def tryGetAnalog():
    pressureSensor = MCP3008(0)
    pot = MCP3008(1)

    while True:
        with open("./data/pressureData.txt", "w") as file:
            file.write(str(pressureSensor.value))

        # print("Pressure: ", pressureSensor.value)
        # print("Pot Value: ", pot.value)

        time.sleep(1)