from gpiozero import DistanceSensor
import time

def tryGetUltrasonicData():
    ultrasonic = DistanceSensor(echo=16, trigger=20)

    storageHeight = 20
    message = "No information about the amount of food in the container"

    while True:
        distance = 100*ultrasonic.distance
        print(distance)
        time.sleep(5)
        
        if(distance<10):
            print("Container Full")
            message = "Container Full"
        elif(distance>18):
            print("Container Almost Empty")
            message = "Container Almost Empty"
        else:
            print("Container Half Full")
            message = "Container Half Full"

        with open("./data/ultrasonicData.txt", "w") as file:
                    file.write(str(message))