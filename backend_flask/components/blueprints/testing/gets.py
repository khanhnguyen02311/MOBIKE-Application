from flask import Blueprint, request, jsonify
from ...dbmodels import *
from ...dbschemas import *
from ...dbsettings import new_Session
from ...inserter import *
from ...dbschemas import *

STEP = 100
bpget = Blueprint('bpget', __name__)

@bpget.route('/', methods = ['GET'])
def get_articles():
    return "Hello from gets"

@bpget.route('/isemailexists/<email>', methods = ['GET'])
def ifemailexists(email):
    Session = new_Session()
    user = Session.query(Account).filter(Account.Email == email).first()
    Session.close()
    return jsonify({"exists": not user is None})

@bpget.route('/isusernameexists/<username>', methods = ['GET'])
def ifusernameexists(username):
    Session = new_Session()
    user = Session.query(Account).filter(Account.Username == username).first()
    Session.close()
    return jsonify({"exists": not user is None})


@bpget.route('/step', methods=['GET'])
def getStep():
    return jsonify(STEP)

@bpget.route('/version/<name>', methods = ['GET'])
def getversions(name):
    Session = new_Session()
    schema = VersionSchema()
    print("Here: " + name)
    result = Session.query(Version).filter(Version.Name == name).first()
    print("Found: " + result.Name)
    Session.close()
    return jsonify(schema.dump(result))

@bpget.route('/permissions', methods = ['GET'])
def getpermissions():
    Session = new_Session()
    schema = PermissionSchema(many=True)
    permissions = Session.query(Permission).all()
    Session.close()
    return jsonify(schema.dump(permissions))


@bpget.route('/count/cities/', methods = ['GET'])
def countcities():
    Session = new_Session()
    count = Session.query(City).count()
    Session.close()
    return jsonify(count)

@bpget.route('/cities/<fid>', methods = ['GET'])
def getcities(fid):
    Session = new_Session()
    FirstID = int(fid)
    schema = CitySchema(many=True)
    cities = Session.query(City).where(City.ID >= FirstID).limit(STEP)
    Session.close()
    return jsonify(schema.dump(cities))


@bpget.route('/count/districts', methods = ['GET'])
def countdistricts():
    Session = new_Session()
    count = Session.query(District).count()
    Session.close()
    return jsonify(count)

@bpget.route('/districts/<fid>', methods = ['GET'])
def getdistricts(fid):
    Session = new_Session()
    FirstID = int(fid)
    schema = DistrictSchema(many=True)
    districts = Session.query(District).filter(District.ID >= FirstID).limit(STEP)
    Session.close()
    return jsonify(schema.dump(districts))


@bpget.route('/count/wards', methods = ['GET'])
def countwards():
    Session = new_Session()
    count = Session.query(Ward).count()
    Session.close()
    return jsonify(count)

@bpget.route('/wards/<fid>', methods = ['GET'])
def getwards(fid):
    Session = new_Session()
    firstID = int(fid)
    schema = WardSchema(many=True)
    wards = Session.query(Ward).filter(Ward.ID >= firstID).limit(STEP)
    Session.close()
    return jsonify(schema.dump(wards))

@bpget.route('/imagetypes', methods = ['GET'])
def getimagetypes():
    Session = new_Session()
    schema = ImageTypeSchema(many=True)
    imagetypes = Session.query(ImageType).all()
    Session.close()
    return jsonify(schema.dump(imagetypes))
