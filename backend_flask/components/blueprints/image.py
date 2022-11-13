from flask import Flask, Blueprint, jsonify, request, send_file
import flask_jwt_extended as jwte
from components.dbsettings import new_Session
from components import dbmodels as dbm, dbschemas as dbs
from ..config import STORAGE_PATH

bpimage = Blueprint('bpimage', __name__)



@bpimage.route('/test', methods = ['GET'])
def test():
    return "Hello"

@bpimage.route('/upload', methods = ['POST'])
def upload():
    if 'file' not in request.files:
        return jsonify({'msg': 'No file part'}), 400
    f = request.files['file']
    if f.filename == '':
        return jsonify({'msg': 'No selected file'}), 400
    ext = f.filename.split('.')[-1]
    new_image = dbm.Image()
    Session = new_Session()
    Session.add(new_image)
    Session.commit()
    f.save(STORAGE_PATH + str(new_image.ID) + "." + ext)
    Session.close()
    return jsonify({'msg': 'File uploaded successfully', 'id': new_image.ID}), 200
    
@bpimage.route('/get/<int:id>', methods = ['GET'])
def get(id):
    Session = new_Session()
    image = Session.query(dbm.Image).filter(dbm.Image.ID == id).first()
    Session.close()
    if image is None:
        return jsonify({'msg': 'Image not found'}), 404
    ext = image.Extension

    return send_file(STORAGE_PATH + str(image.ID) + "." + ext, mimetype = 'image/' + ext)
