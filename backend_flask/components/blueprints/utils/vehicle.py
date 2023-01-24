import json
from datetime import datetime
from flask import Flask, Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from components.dbsettings import new_Scoped_session
from components import dbmodels as dbm, dbschemas as dbs

bputils = Blueprint('bputils', __name__)


# CONTINUE
bputils.route("/vehicle/brands", methods=['GET'])
def getvehiclebrand():
   info = request.get_json()
   Session = new_Scoped_session()
   try:
      Session.commit()
      return jsonify({"msg": "Completed", "error": "", "info": ""})
   
   except Exception as e:
      Session.rollback()
      return jsonify({"msg": "Incompleted", "error": str(e), "info": ""})

