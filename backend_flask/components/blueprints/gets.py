from flask import Blueprint, request, jsonify
from ..dbmodels import *
from ..dbschemas import *
from ..dbsettings import Session
from ..inserter import *
from ..dbschemas import *

bpget = Blueprint('bpget', __name__)


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


@bpget.route('/cities', methods = ['GET'])
def getcities():
    schema = CitySchema(many=True)
    cities = Session.query(City).all()
    return jsonify(schema.dump(cities))


@bpget.route('/districts', methods = ['GET'])
def getdistricts():
    schema = DistrictSchema(many=True)
    districts = Session.query(District).all()
    return jsonify(schema.dump(districts))


@bpget.route('/wards', methods = ['GET'])
def getwards():
    schema = WardSchema(many=True)
    wards = Session.query(Ward).all()
    return jsonify(schema.dump(wards))


@bpget.route('/imagetypes', methods = ['GET'])
def getimagetypes():
    schema = ImageTypeSchema(many=True)
    imagetypes = Session.query(ImageType).all()
    return jsonify(schema.dump(imagetypes))
