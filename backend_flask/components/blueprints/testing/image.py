import os
from flask import Flask, Blueprint, jsonify, request, send_file
import flask_jwt_extended as jwte
from components.dbsettings import new_Session
from components import dbmodels as dbm, dbschemas as dbs
from ...config import STORAGE_PATH

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
    Session = new_Session()
    try:
        new_image = dbm.Image(Filename=f.filename)
        Session.add(new_image)
        Session.commit()
        # return jsonify({'msg': new_image.ID}), 200
        # test = Session.query(dbm.Image).get(new_image.ID)
        # if (test is new_image):
        #     return jsonify({'msg': 'Success'}), 200
        # new_image.Filename = str(new_image.ID) + '.' + ext
        # Session.flush()
        # Session.refresh(new_image)
        f.save(os.path.join(STORAGE_PATH, str(new_image.ID) + '.' + ext))
        
        
        return jsonify({'msg': 'File uploaded successfully', 'id': new_image.ID}), 200
    except Exception as e:
        Session.rollback()
        return jsonify({'msg': 'Incompleted', 'error': str(e)}), 401
    
    
@bpimage.route('/get/<id>', methods = ['GET'])
def get(id):
    id = int(id)
    Session = new_Session()
    image = Session.query(dbm.Image).filter(dbm.Image.ID == id).first()
    Session.close()
    if image is None:
        return jsonify({'msg': 'Image not found'}), 404
    ext = image.Filename.split('.')[-1]

    return send_file(STORAGE_PATH + image.Filename, mimetype = 'image/' + ext)
