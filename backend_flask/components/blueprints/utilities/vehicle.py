from flask import Flask, Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
import sqlalchemy.orm as sqlorm
from components.dbsettings import new_Scoped_session
from components import dbmodels as dbm, dbschemas as dbs

bpvehicle = Blueprint('bpvehicle', __name__)


@bpvehicle.route("/vehicle/brands", methods=['GET'])
def getvehiclebrand():
   Session = new_Scoped_session()
   schema = dbs.VehicleBrandSchema()
   try:
      brands = Session.query(dbm.VehicleBrand).options(sqlorm.joinedload(dbm.VehicleBrand.rel_Image)).all()
      Session.close()
      json_brands = {}
      for index, item in enumerate(brands):
         json_brands[index] = schema.dump(item)
      return jsonify({"msg": "Completed", "error": "", "info": json_brands})
   
   except Exception as e:
      Session.rollback()
      return jsonify({"msg": "Incompleted", "error": str(e), "info": ""})


@bpvehicle.route("/vehicle/lineups/<id>", methods=['GET'])
def getvehiclelineups(id):
   Session = new_Scoped_session()
   schema = dbs.VehicleLineupSchema()
   try:
      lineups = Session.query(dbm.VehicleLineup).filter(dbm.VehicleLineup.ID_VehicleBrand == id).all()
      Session.close()
      json_lineups = {}
      for index, item in enumerate(lineups):
         json_lineups[index] = schema.dump(item)
      return jsonify({"msg": "Completed", "error": "", "info": json_lineups})
   
   except Exception as e:
      Session.rollback()
      return jsonify({"msg": "Incompleted", "error": str(e), "info": ""})


@bpvehicle.route("/vehicle/conditions", methods=['GET'])
def getvehicleconditions():
   Session = new_Scoped_session()
   schema = dbs.VehicleConditionSchema()
   try:
      conditions = Session.query(dbm.VehicleCondition).all()
      Session.close()
      json_conditions = {}
      for index, item in enumerate(conditions):
         json_conditions[index] = schema.dump(item)
      return jsonify({"msg": "Completed", "error": "", "info": json_conditions})
   
   except Exception as e:
      Session.rollback()
      return jsonify({"msg": "Incompleted", "error": str(e), "info": ""})
   
   
@bpvehicle.route("/vehicle/types", methods=['GET'])
def getvehicletypes():
   Session = new_Scoped_session()
   schema = dbs.VehicleTypeSchema()
   try:
      conditions = Session.query(dbm.VehicleType).all()
      Session.close()
      json_types = {}
      for index, item in enumerate(conditions):
         json_types[index] = schema.dump(item)
      return jsonify({"msg": "Completed", "error": "", "info": json_types})
   
   except Exception as e:
      Session.rollback()
      return jsonify({"msg": "Incompleted", "error": str(e), "info": ""})
   
   
@bpvehicle.route("/vehicle/colors", methods=['GET'])
def getcolors():
   Session = new_Scoped_session()
   schema = dbs.ColorSchema()
   try:
      colors = Session.query(dbm.Color).all()
      Session.close()
      json_colors = {}
      for index, item in enumerate(colors):
         json_colors[index] = schema.dump(item)
      return jsonify({"msg": "Completed", "error": "", "info": json_colors})
   
   except Exception as e:
      Session.rollback()
      return jsonify({"msg": "Incompleted", "error": str(e), "info": ""})