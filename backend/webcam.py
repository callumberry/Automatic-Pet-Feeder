import cv2
import base64

def webcam(socketio):
    cap = cv2.VideoCapture(0, cv2.CAP_V4L2)
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 160)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 120)

    target_frame_rate = 10
    target_frame_time = 1 / target_frame_rate

    while cap.isOpened():


        ret, frame = cap.read()

        if not ret:
            print("Error: Failed to capture frame")
            break
      
          # Encode the frame in JPEG format
        _, buffer = cv2.imencode('.jpg', frame)
        encoded_frame = base64.b64encode(buffer).decode('utf-8')

        # Emit the frame over SocketIO to the frontend
        socketio.emit('frame', {'data': encoded_frame})
      
        cv2.waitKey(int(target_frame_time * 1000))

    # Release resources
    cap.release()
    cv2.destroyAllWindows()