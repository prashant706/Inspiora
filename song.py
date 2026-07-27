import time     # This import the time module to control the speed of the animation.
import sys      # This import the sys modul to control system specific parameter like priting to the screen.


# These are color codes used to change the text code in the terminal
RED     = '\033[91m'
GREEN   = '\033[92m'
YELLOW  = '\033[93m'
BLUE    = '\033[94m'
MAGENTA = '\033[95m'
CYAN    = '\033[96m'
RESET   = '\033[0m'     # This resets the color back to normal



# Lyrics stored as a list of tuples. Each tuple contains a color code and a line of lyrics.
lyrics = [
    (RED, "I only see my goals, I don't belive in failure"),
    (GREEN, "Cause I know the smallesr voices, they can make it major"),
    (YELLOW, "I got my boys with me, at least those in favor"),
    (BLUE, "And if we don't meet before I leave, I hope I'll see you later"),
    (MAGENTA, "Once I was 20 years old, my story got told"),
    (CYAN, "I was writing'bout everything I saw before me"),
    (RESET, "Once, I was 20 years old"),
]

# Function to animate text letter by letter with color
def animate_text(color, text):
    
    for char in text: # Loop through each character in the text
        sys.stdout.write(color + char + RESET) # print the character in the specified color
        sys.stdout.flush() # Immediately print the character to the screen
        time.sleep(0.05) # Wait for 0.05 seconds before priting the next character 
    print() # Print a new line after finishing the text

# Main function to display the lyrics with animation
def main():
    for color, line in lyrics: # Loop through each tuple in the lyrics list
        animate_text(color, line) # Call the animate_text function to display each line
        time.sleep(0.3) # wait for 0.3 seconds before showing the next line

# This conditions ensures that main function runs only if this file is executed directly
if __name__ == "__main__":
    main() # Call the main function to start the program