from PIL import Image

# Define grid size and pixel size
multiple = 30
grid_width = 16*multiple
grid_height = 9*multiple
pixel_size = 5

# Calculate image size
image_width = grid_width * pixel_size
image_height = grid_height * pixel_size

# Create a new image with white background
image = Image.new("RGB", (image_width, image_height), "white")
pixels = image.load()

# Iterate over each pixel and set the color
for i in range(grid_width):
    for j in range(grid_height):
        # Alternate between black and white pixels based on the position
        if (i + j) % 2 == 0:
            color = (255,255,255)  # Black
        else:
            color = (156, 156, 206);
 # White

        # Set the color of the pixel
        for x in range(pixel_size):
            for y in range(pixel_size):
                pixels[i * pixel_size + x, j * pixel_size + y] = color

# Save the image
image.save("grey.jpg")
