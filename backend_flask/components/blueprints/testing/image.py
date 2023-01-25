import os
from flask import Flask, Blueprint, jsonify, request, send_file
import flask_jwt_extended as jwte
from components.dbsettings import new_Scoped_session, new_Session
from components import dbmodels as dbm, dbschemas as dbs
from ...config import STORAGE_PATH

bpimage = Blueprint('bpimage', __name__)

@bpimage.route('/test', methods = ['GET'])
def test():
    return "Hello"

def getSaveLocation(imageTypeID:int = 1):
    imageTypeFolder = ""
        
    if imageTypeID == 1:
        imageTypeFolder = 'post'
    elif imageTypeID == 2:
        imageTypeFolder = 'user'
    elif imageTypeID == 3:
        imageTypeFolder = 'logo'
    elif imageTypeID == 4:
        imageTypeFolder = 'identity'
    
    return STORAGE_PATH + imageTypeFolder + '/'    

def saveImage(file, imageTypeID:int = 1):
    if not (imageTypeID >= 1 and imageTypeID <= 4):
        return "Image type not exists", -1
    if file.filename == "":
        return "No file selected", -1
    ext = file.filename.split('.')[-1]
    if ext not in ['jpg', 'jpeg', 'png']:
        return "File extension not supported", -1
    Session = new_Scoped_session()
    try:
        new_image = dbm.Image(Filename = "blabla", ID_ImageType=imageTypeID)
        Session.add(new_image)
        Session.flush()
        new_image.FileName = str(new_image.ID) + '.' + ext
        Session.commit()

        file.save(os.path.join(getSaveLocation(imageTypeID), str(new_image.ID) + '.' + ext))
        
        Session.close()
        return "File uploaded successfully", new_image.ID
    except Exception as e:
        Session.rollback()
        return f"Image save error: '{e}'", -1
        
        
@bpimage.route('/upload/<imageTypeID>', methods = ['POST'])
def upload(imageTypeID: int):
    if 'file' not in request.files:
        return jsonify({'msg': 'No file part'}), 400
    file = request.files['file']

    if not (imageTypeID >= 1 and imageTypeID <= 4):
        return "Image type not exists", -1
    if file.filename == "":
        return "No file selected", -1
    ext = file.filename.split('.')[-1]
    if ext not in ['jpg', 'jpeg', 'png']:
        return "File extension not supported", -1
    
    Session = new_Scoped_session()
    try:
        new_image = dbm.Image(Filename = "blabla", ID_ImageType=imageTypeID)
        Session.add(new_image)
        Session.flush()
        new_image.FileName = str(new_image.ID) + '.' + ext
        Session.commit()

        file.save(os.path.join(getSaveLocation(imageTypeID), str(new_image.ID) + '.' + ext))
        
        Session.close()
        return "File uploaded successfully", new_image.ID
    except Exception as e:
        Session.rollback()
        return f"Image save error: '{e}'", -1
    
    
    
    if f.filename == '':
        return jsonify({'msg': 'No selected file'}), 400
    ext = f.filename.split('.')[-1]
    Session = new_Scoped_session()
    try:
        new_image = dbm.Image(Filename=f.filename, ID_ImageType=1)
        Session.add(new_image)
        Session.flush()
        # return jsonify({'msg': new_image.ID}), 200
        # test = Session.query(dbm.Image).get(new_image.ID)
        # if (test is new_image):
        #     return jsonify({'msg': 'Success'}), 200
        new_image.Filename = str(new_image.ID) + '.' + ext
        Session.commit()
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
    try:
        Session = new_Scoped_session()
        image = Session.query(dbm.Image).filter(dbm.Image.ID == id).first()
        Session.close()
        
        if image is None:
            return jsonify({'msg': 'Image not found'}), 404
        
        ext = image.Filename.split('.')[-1]
        
        path = getSaveLocation(image.ID_ImageType) + "/" + image.Filename
        return send_file(path, mimetype = 'image/' + ext)
    except Exception as e:
        return jsonify({'msg': 'Incompleted', 'error': str(e)}), 401

