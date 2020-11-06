from app import app

from image_utils import *


@app.route('/index')
def index():
    return "Welcome to deverify!"


@app.route('/verify', methods=['POST'])
def verify_images():
    if request.method == 'POST':
        id_image = request.files['id']
        face_image = request.files['face']

        id_image_resized = resize_img(id_image, (225, 225))
        face_image_resized = resize_img(face_image, (225, 225))

        id_image_face = get_face(id_image_resized)
        face_image_face = get_face(face_image_resized)

        (id_image_face_resized,
         face_image_face_resized) = get_same_img_size(id_image_face,
                                                      face_image_face)

        id_image_features = get_imagenet_output(id_image_face_resized)
        face_image_features = get_imagenet_output(face_image_face_resized)

        similarity = get_raw_image_similarity(id_image_features,
                                              face_image_features)

        return similarity
