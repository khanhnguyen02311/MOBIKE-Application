import os
from flask import Flask, Blueprint, jsonify, request, send_file
import flask_jwt_extended as jwte
from components.dbsettings import new_Scoped_session
from components import dbmodels as dbm, dbschemas as dbs
from ...config import STORAGE_PATH

bplogo = Blueprint('bplogo', __name__)
    

@bplogo.route('/logo/<id>', methods = ['GET'])
def getlogo(id):
    id = int(id)
    Session = new_Scoped_session()
    image = Session.query(dbm.Image).filter(dbm.Image.ID == id).first()
    Session.close()
    if image is None:
        return jsonify({'msg': 'Incompleted', 'error': 'Image not found'}), 404
    ext = image.Filename.split('.')[-1]

    return send_file(STORAGE_PATH + "logo/" + image.Filename, mimetype = 'image/' + ext)
