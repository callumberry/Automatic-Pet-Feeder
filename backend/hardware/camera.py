# import cv2
# import imutils
# import time
# from datetime import datetime

# class VideoCamera(object):
#     def __init__(self, file_type=".jpg", photo_string="stream_photo"):
#         self.cap = cv2.VideoCapture(0)
#         self.file_type = file_type # image type i.e. .jpg
#         self.photo_string = photo_string # Name to save the photo
#         time.sleep(2.0)

#     def __del__(self):
#         self.vs.stop()

#     def get_frame(self):
#         success, frame = self.cap.read()  # Read a frame from the video capture object
#         if not success:
#             # This is failing
#             print("frame error")
#             return
#         else:
#             ret, buffer = cv2.imencode('.jpg', frame)  # Encode the frame as JPEG
#             return buffer.tobytes()  # Convert to bytes
#               # Yield a frame in HTTP streaming format

#     # # Take a photo, called by camera button
#     # def take_picture(self):
#     #     frame = self.vs.read()
#     #     ret, image = cv.imencode(self.file_type, frame)
#     #     today_date = datetime.now().strftime("%m%d%Y-%H%M%S") # get current time
#     #     cv.imwrite(str(self.photo_string + "_" + today_date + self.file_type), frame)
