# IMPORTS #

# Flask 
from flask import Flask, jsonify
from flask_cors import CORS
from flask import request
from flask_socketio import SocketIO

# Time and Scheduler
import ntplib
from time import ctime
from apscheduler.schedulers.background import BackgroundScheduler

# Threading
import threading
 
# Hardware 
from webcam import webcam
# Uncomment For Pi, comment for PC #
# from hardware import move_servo_min_to_max, toggle_led, move_stepper_motor

# ----------------------------------------------------------------------------------#
# SETUP #

app = Flask(__name__)
CORS(app)

# Change IP to current IP
socketio = SocketIO(app, cors_allowed_origins="http://192.168.2.46:5173", path='/socket.io') 

# Setting Global Variables
timeOne = None
timeTwo = None
portions = 1

# ----------------------------------------------------------------------------------#
# FUNCTIONS #

# Function to get current time through the network
def get_current_time():
    # Basic Method for accessing ntp
    c = ntplib.NTPClient()
    response = c.request('pool.ntp.org')
    full_time = ctime(response.tx_time)

    # Formats the time to only have hour and minutes
    parts = full_time.split()
    time_part = parts[3]
    hour, minute, _ = time_part.split(':')
    
    return f"{hour}:{minute}"
    
# Runs Webcam function from seperate py file
def run_webcam():
    webcam(socketio)

# Sets up the thread for the camera
webcam_thread = threading.Thread(target=run_webcam, daemon=True)
webcam_thread.start()

# Function that compares current time with set feeding times, to move motor based on portions
def schedule_job():
    current_time = get_current_time()
    print("schedule test")
    print("Current Time:", current_time, " timeOne:", timeOne," timeTwo:", timeTwo)

    # checks if current time is one of the selected feeding times
    if current_time == timeOne or current_time == timeTwo:
        portions
        print(portions)

        for _ in range(portions):
            # Uncomment For Pi, comment for PC #
            #move_servo_min_to_max()
            #move_stepper_motor()
            print("Servo Moved")
    

        socketio.emit('message_to_client', portions)
        print("Performing scheduled action at", current_time)

    else:
        print("No action performed", current_time)


# Sets up the scheduler that is used to chekc if it is time to feed the pet
scheduler = BackgroundScheduler()
scheduler.start()
scheduler.add_job(schedule_job, 'interval', minutes=1)

# ----------------------------------------------------------------------------------#
# APP ROUTES #

# Test Route to confirm React and Flask are connected
@app.route('/api/data', methods=['GET'])
def get_data():
    data = {'message': 'This is the data you requested'}
    return data

# Route is called when Toggle LED Button is pressed
@app.route('/api/backend-action', methods=['GET'])
def perform_backend_action():
    # Uncomment For Pi, comment for PC #
    #toggle_led()
    
    print("LED Toggled")
    return jsonify({'message': 'Led toggled'})

# Route is called when Manual Feed Button is pressed or scheduler is run
# This Should be changed so that move motor is a function that contains the for loop, this funciton and scheduler should jsut call move motor function
@app.route('/api/servo-action', methods=['GET'])
def perform_servo_action():
    global portions
    print(portions)
    # Perform the servo action 'repeat' times based on the sliderValue
    for _ in range(portions):
        # Uncomment For Pi, comment for PC #
        #move_servo_min_to_max()
        #move_stepper_motor()
        print("Motor Moved")

    return jsonify({'message': f'Servo Positioned {portions} times'})\

# Route is called when Portion Button is pressed
@app.route('/api/portion-action', methods=['GET'])
def perform_portion_action():
    global portions
    portions = request.args.get('portions', default=1, type=int)
    print("Portions", portions)

    return jsonify({'message': f'Portions: {portions}'})\

# Route is called when Set Schedule Button is Pressed
@app.route('/api/schedule-action', methods=['GET'])
def perform_schedule_action():
    global timeOne
    global timeTwo
    timeOne = request.args.get('timeOne', default="07:00")
    timeTwo = request.args.get('timeTwo', default="18:00")
   
    print("timeOne:", timeOne," timeTwo:", timeTwo)

    with open("./data/feedTimes.txt", "w") as file:
        file.write(f"{timeOne}, {timeTwo}")
    
    return jsonify({'message': 'Schedule'})

# ----------------------------------------------------------------------------------#
# IDK what this does but it is needed, starts something i think
if __name__ == '__main__':
    socketio.run(app)
