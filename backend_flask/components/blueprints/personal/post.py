import json
from datetime import datetime
from flask import Flask, Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from components.dbsettings import new_Scoped_session
from components import dbmodels as dbm, dbschemas as dbs

bppost = Blueprint('bppost', __name__)

@bppost.route('/create', methods=['POST'])
def create():
    data = request.get_json()
    print(data)
    return jsonify({'message': 'Post created.'}), 200

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
