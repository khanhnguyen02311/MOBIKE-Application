from enum import Enum
from flask import Blueprint, request, jsonify
from ..dbmodels import *
from ..dbschemas import *
from ..dbsettings import Session
from ..inserter import *

bppost = Blueprint('bppost', __name__)

@bppost.route('/get', methods = ['GET'])
def get_articles():
    return "Hello"

class DataColumn(Enum):
    Email = 1,
    Username = 3,


@bppost.route('/ifexists', methods = ['POST'])
def ifexists():
    data = request.json['data']
    column = request.json['column']
    if (Session.query(Post).filter(Post.title == title).first() is None):
        return jsonify(exists=False)
    else:
        return jsonify(exists=True)

@bppost.route('/insertlocations', methods = ['POST'])
def insertlocations():
    print("Inserting locations...")
    return InsertLocation()

@bppost.route('/insertpermissions', methods = ['POST'])
def insertpermission():
    print("Inserting permissions...")
    return InsertPermission()