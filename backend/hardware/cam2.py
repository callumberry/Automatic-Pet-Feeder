import cv2

# Open a connection to the USB camera (usually /dev/video0)
cap = cv2.VideoCapture(0)

# Check if the camera is opened successfully
if not cap.isOpened():
    print("Error: Could not open camera.")
    exit()

# Set the video frame width and height
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

# Main loop
while True:
    # Read a frame from the camera
    ret, frame = cap.read()

    # Display the frame
    if not ret or frame is None or frame.shape[0] == 0 or frame.shape[1] == 0:
        print("Error: Invalid Frame")
        break

    cv2.imshow("USB Camera", frame)

    # Break the loop if 'q' key is pressed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the camera and close the OpenCV window
cap.release()
cv2.destroyAllWindows()
