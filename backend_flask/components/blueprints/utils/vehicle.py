from flask import Flask, Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
import sqlalchemy.orm as sqlorm
from components.dbsettings import new_Scoped_session
from components import dbmodels as dbm, dbschemas as dbs

bpvehicle = Blueprint('bpvehicle', __name__)


bpvehicle.route("/vehicle/brands", methods=['GET'])
def getvehiclebrand():
   Session = new_Scoped_session()
   try:
      brands = Session.query(dbm.VehicleBrand).options(sqlorm.joinedload(dbm.VehicleBrand.rel_Image)).all()
      Session.commit()
      return jsonify({"msg": "Completed", "error": "", "info": brands})
   
   except Exception as e:
      Session.rollback()
      return jsonify({"msg": "Incompleted", "error": str(e), "info": ""})

