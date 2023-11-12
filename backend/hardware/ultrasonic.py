from gpiozero import DistanceSensor

ultrasonic = DistanceSensor(echo=16, trigger=20)

storageHeight = 20

while True:
    print(ultrasonic.distance)

    if((storageHeight*0.9)<ultrasonic.distance):
        print("Container Full")

    elif((storageHeight*0.1)<ultrasonic.distance):
        print("Container Almost Empty")