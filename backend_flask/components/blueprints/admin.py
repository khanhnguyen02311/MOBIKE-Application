from flask import Blueprint, request, jsonify
from ..dbmodels import *
from ..dbschemas import *
from ..dbsettings import new_Session
from ..inserter import *
import glob, os
from .image import STORAGE_PATH

bpadmin = Blueprint('bpadmin', __name__)

@bpadmin.route('/isusernameexists', methods = ['POST'])
def ifusernameexists():
    Session = new_Session()
    data = request.get_json()
    print("Checking if username exists: Data: ", data)
    username = data['username']
    user = Session.query(Account).filter(Account.Username == username).first()
    Session.close()
    return jsonify({"exists": not user is None})

@bpadmin.route('/insertlocations', methods = ['POST'])
def insertlocations():
    print("Inserting locations...")
    return InsertLocation()

@bpadmin.route('/insertpermissions', methods = ['POST'])
def insertpermission():
    print("Inserting permissions...")
    return InsertPermission()

@bpadmin.route('/insertimagetypes', methods = ['POST'])
def insertimagetype():
    print("Inserting image types...")
    return InsertImageType()

@bpadmin.route('/initversions', methods = ['POST'])
def initversions():
    Session = new_Session()
    print("Initializing version...")
    EmptyTables({"Version"})
    Session.add(Version(Name="Locations", Version=1))
    Session.add(Version(Name="Permissions", Version=1))
    Session.add(Version(Name="ImageTypes", Version=1))
    Session.commit()
    Session.close()
    return jsonify({"msg": "Success"})


@bpadmin.route('/clearimages', methods = ['POST'])
def clearimages():
    print("Clearing images...")
    EmptyTables({"Image"})
    images = glob.glob(STORAGE_PATH + "*")
    for image in images:
        os.remove(image)
    return jsonify({"msg": "Images cleared"})
