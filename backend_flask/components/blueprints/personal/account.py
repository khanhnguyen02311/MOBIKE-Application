from flask import Flask, Blueprint, request, jsonify
import flask_jwt_extended as jwte
from components.dbsettings import new_Session
from components import dbmodels as dbm, dbschemas as dbs

bpaccount = Blueprint('bpaccount', __name__)


@bpaccount.route("/info", methods=['GET'])
@jwte.jwt_required()
def getinfo():
   current_user = jwte.get_jwt_identity()   
   return jsonify({"user": current_user})


@bpaccount.route("/info", methods=['PUT'])
@jwte.jwt_required()
def changeinfo():
   current_user = jwte.get_jwt_identity()
   if current_user is None:
      return jsonify({"error": "Token not valid"})
   pass