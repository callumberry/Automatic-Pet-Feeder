from gpiozero import LED

# Define the LED and its GPIO pin
led = LED(21)  # Change the GPIO pin number as needed

def toggle_led():
    if led.is_active:
        led.off()
    else:
        led.on()