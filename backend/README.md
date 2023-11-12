# FEED

## To run

# IP
- Add IP to vit.config.js and to package.json under proxy
    - can get ip by running ifconfig
    - or run backend 

# GPIO Control
- Run command in terminal outside of virtual environment
    - sudo apt install python3-gpiozero

# Backend/Server
- Cd to server and run the commands:
    - python3 -m venv venv
    - source venv/bin/activate
    - pip install -r requirements.txt
    - virtualenv --system-site-packages venv
    - sudo /home/pi/Desktop/feed/server/venv/bin/flask run --host=0.0.0.0




# Frontend/Client
- In another terminal, cd to client and run command:
    - npm install
    - npm fund
    - npm run dev -- --host  
