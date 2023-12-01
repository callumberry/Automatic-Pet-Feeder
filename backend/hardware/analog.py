from gpiozero import MCP3008
import time

def tryGetAnalog():
    pressureSensor = MCP3008(0)
    pot = MCP3008(1)

    while True:
        zeroedValue = (round(pressureSensor.value, 4))*100
        with open("./data/pressureData.txt", "w") as file:
            file.write(str(zeroedValue))

        # print("Pressure: ", pressureSensor.value)
        # print("Pot Value: ", pot.value)

        time.sleep(1)