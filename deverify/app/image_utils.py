import cv2
import numpy as np
from keras.applications import VGG16


def load_face_haarcascade():
    """Load haarcascade file"""

    return cv2.CascadeClassifier(
        './haarcascades/haarcascade_frontalface_default.xml')


def read_img(img_name):
    """Read image and return a 400x400 image"""

    img = cv2.imread(f'{img_name}')

    return resize_img(img, (400, 400))


def resize_img(img, size_tuple):
    """Resize image with the given tuple size"""

    return cv2.resize(img, size_tuple)


def get_same_img_size(img1, img2):
    """Return both image of the same size. The size of
    small image is kept as standard
    """

    (a1, b1, c1) = img1.shape
    (a2, b2, c2) = img2.shape

    if (a1 < a2):
        return (img1, resize_img(img2, (a1, a1)))
    else:
        return (resize_img(img1, (a2, a2)), img2)


def get_face(img):
    """Get the face from the image"""

    # Buffer for cropping, so that possibility of loosing
    # some part of face is less.
    CROP_BUFFER = 10

    # Get face.
    gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    face_cascade = load_face_haarcascade()

    faces = face_cascade.detectMultiScale(gray_img,
                                          scaleFactor=1.1,
                                          minNeighbors=5,
                                          minSize=(30, 30))

    # No. of face validation.
    if not faces: return 'No face detected.'
    if not faces.shape: return 'Error occured'
    (no_of_faces, _) = faces.shape
    if no_of_faces > 1:
        return 'More than one face detected. Can not move forward.'
    if not no_of_faces: return 'No face detected.'

    # Get detected face coordinates.
    (x, y, w, h) = faces[0]

    return img[y:y + h, x:x + w]


def get_raw_image_similarity(img1, img2):
    """Returns cosine similarity between 2 images"""

    return 1 - distance.cosine(img1.flatten().reshape(1, -1),
                               img2.flatten().reshape(1, -1))


def get_imagenet_output(img):
    """Returns the output after passing the image 
    through the VGG16 model"""

    (w, h, c) = img.shape

    model = VGG16(weights='imagenet', include_top=False, input_shape=(w, h, c))

    return model.predict(img.reshape(1, w, h, c))
