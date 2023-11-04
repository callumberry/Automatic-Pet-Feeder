# FEED

## To run
- Add IP to vit.config.js and to package.json under proxy
- Cd to server and run the commands:
    - python3 -m venv .venv
    - pip install -r requirements.txt
- In one terminal, cd to server and run commands:
    -  source venv/bin/activate
    - `virtualenv --system-site-packages venv`
- In another terminal, cd to client and run command:
    - npm run dev -- --host
    

# Extras

## Making venv
- python3 -m venv .venv
- . .venv/bin/activate     or    source venv/bin/activate

## Running Flask
- pip install flask
- flask run --host=0.0.0.0

## Running Client Side
- npm run dev
- npm run dev -- --host

## Bug fixing venv/hardware:
- source venv/bin/activate
- `virtualenv --system-site-packages venv`