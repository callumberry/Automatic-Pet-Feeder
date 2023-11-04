from flask import Flask, jsonify
from flask_cors import CORS
import time


from time import sleep

#from ledControl import toggle_led
#from servoControl import move_servo_min_to_max

app = Flask(__name__)
CORS(app)

@app.route('/api/data', methods=['GET'])
def get_data():
    data = {'message': 'This is the data you requested'}
     
    return data

@app.route('/api/backend-action', methods=['GET'])
def perform_backend_action():
    #toggle_led()
    print("LED is ON")
    return jsonify({'message': 'Led toggled'})

@app.route('/api/servo-action', methods=['GET'])
def perform_servo_action():
    #move_servo_min_to_max()
    print("Servo Moved")
    return jsonify({'message': 'Servo Positioned'})

if __name__ == '__main__':
    app.run(debug=True)