import json
from datetime import datetime
from flask import Flask, Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from components.dbsettings import new_Scoped_session
from components import dbmodels as dbm, dbschemas as dbs
bppost = Blueprint('bppost', __name__)


@bppost.route('/create', methods=['POST'])
@jwt_required()
def create():
    currentuser = get_jwt_identity()
    try:
        title = request.form.get('title')
        content = request.form.get('content')
        pricetag = int(request.form.get('pricetag'))
        images = []
        for file in request.files:
            ext = file.filename.split('.')[-1]
            if ext in ['png', 'jpg', 'jpeg']:
                images.append(file)
            
        fake_address = dbm.Address(Detail_address="", ID_City=1, ID_District=1, ID_Ward=1)
        new_post = dbm.Post(Title=title, Content=content, PriceTag=pricetag, ID_Account=currentuser.ID)
        
        return ""
    except Exception as e:
        return jsonify({"message": "Incomplete", "error": str(e)})
    # return jsonify({'message': 'Post created.','data': request.data}), 200

@bppost.route('/modify/<ID>', methods=['POST'])
def modify(ID):
    data = request.get_json()
    print(data)
    return jsonify({'message': 'Post modified.'}), 200

@bppost.route('/delete/<ID>', methods=['POST'])
def delete(ID):
    data = request.get_json()
    print(data)
    return jsonify({'message': 'Post deleted.'}), 200
