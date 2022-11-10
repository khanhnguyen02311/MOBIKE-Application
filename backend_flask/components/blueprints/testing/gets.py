from flask import Blueprint, request, jsonify
from ...dbmodels import *
from ...dbschemas import *
from ...dbsettings import Session
from ...inserter import *
from ...dbschemas import *

STEP = 100
bpget = Blueprint('bpget', __name__)

@bpget.route('/step', methods=['GET'])
def getStep():
    return jsonify(STEP)


@bpget.route('/version/<name>', methods = ['GET'])
def getversions(name):
    schema = VersionSchema()
    print("Here: " + name)
    result = Session.query(Version).filter(Version.Name == name).first()
    print("Found: " + result.Name)
    return jsonify(schema.dump(result))

@bpget.route('/permissions', methods = ['GET'])
def getpermissions():
    schema = PermissionSchema(many=True)
    permissions = Session.query(Permission).all()
    return jsonify(schema.dump(permissions))


@bpget.route('/count/cities/', methods = ['GET'])
def countcities():
    return jsonify(Session.query(City).count())

@bpget.route('/cities/<fid>', methods = ['GET'])
def getcities(fid):
    FirstID = int(fid)
    schema = CitySchema(many=True)
    cities = Session.query(City).where(City.ID >= FirstID).limit(STEP)
    return jsonify(schema.dump(cities))


@bpget.route('/count/districts', methods = ['GET'])
def countdistricts():
    return jsonify(Session.query(District).count())

@bpget.route('/districts/<fid>', methods = ['GET'])
def getdistricts(fid):
    FirstID = int(fid)
    schema = DistrictSchema(many=True)
    districts = Session.query(District).filter(District.ID >= FirstID).limit(STEP)
    return jsonify(schema.dump(districts))


@bpget.route('/count/wards', methods = ['GET'])
def countwards():
    return jsonify(Session.query(Ward).count())

@bpget.route('/wards/<fid>', methods = ['GET'])
def getwards(fid):
    firstID = int(fid)
    schema = WardSchema(many=True)
    wards = Session.query(Ward).filter(Ward.ID >= firstID).limit(STEP)
    return jsonify(schema.dump(wards))

@bpget.route('/imagetypes', methods = ['GET'])
def getimagetypes():
    schema = ImageTypeSchema(many=True)
    imagetypes = Session.query(ImageType).all()
    return jsonify(schema.dump(imagetypes))
