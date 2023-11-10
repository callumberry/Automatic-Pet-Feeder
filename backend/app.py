from flask import Flask, jsonify
from flask_cors import CORS
from flask import request
import ntplib
from time import ctime
from apscheduler.schedulers.background import BackgroundScheduler
from hardware import move_servo_min_to_max, toggle_led, move_stepper_motor


timeOne = None
timeTwo = None
portions = 1

app = Flask(__name__)
CORS(app)

def get_current_time():
    c = ntplib.NTPClient()
    response = c.request('pool.ntp.org')
    full_time = ctime(response.tx_time)

    parts = full_time.split()
    time_part = parts[3]
    hour, minute, _ = time_part.split(':')
    
    return f"{hour}:{minute}"
    

scheduler = BackgroundScheduler()
scheduler.start()




@app.route('/api/data', methods=['GET'])
def get_data():
    data = {'message': 'This is the data you requested'}
     
    return data

@app.route('/api/backend-action', methods=['GET'])
def perform_backend_action():
    toggle_led()
    print("LED Toggled")
    return jsonify({'message': 'Led toggled'})

@app.route('/api/servo-action', methods=['GET'])
def perform_servo_action():
    global portions
    repeat = portions
    print(repeat)
    # Perform the servo action 'repeat' times based on the sliderValue
    for _ in range(repeat):
        move_servo_min_to_max()
        #move_stepper_motor()
        print("Servo Moved")

    return jsonify({'message': f'Servo Positioned {repeat} times'})\

@app.route('/api/portion-action', methods=['GET'])
def perform_portion_action():
    global portions
    portions = request.args.get('portions', default=1, type=int)
    print("Portions", portions)

    return jsonify({'message': f'Portions: {portions}'})\

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

def schedule_job():
    current_time = get_current_time()
    print("schedule tesat")
    print("Current Time:", current_time, " timeOne:", timeOne," timeTwo:", timeTwo)

    if current_time == timeOne or current_time == timeTwo:
        repeat = portions
        print(repeat)
        # Perform the servo action 'repeat' times based on the sliderValue
        for _ in range(repeat):
            move_servo_min_to_max()
            #move_stepper_motor()
            print("Servo Moved")
        print("Performing scheduled action at", current_time)
    else:
        print("No action performed", current_time)

# Schedule the job to run every minute
scheduler.add_job(schedule_job, 'interval', minutes=1)

if __name__ == '__main__':
    app.run(debug=True)