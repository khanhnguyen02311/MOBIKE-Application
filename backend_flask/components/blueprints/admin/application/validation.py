import os
from flask import Flask, Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import flask_jwt_extended as jwte
from components.dbsettings import new_Scoped_session
from components import dbmodels as dbm, dbschemas as dbs
from components.security import check_hash, make_hash

bpappadminval = Blueprint('bpappadminval', __name__)


@bpappadminval.route('/status/set', method = ['POST'])
@jwt_required()
def setpoststatus():
   current_user = get_jwt_identity()   
   if current_user is None:
      return jsonify({"msg": "Incompleted", "error": "Invalid token", "info": ""})

   Session = new_Scoped_session()
   try:
      acc = Session.query(dbm.Account).get(current_user['ID'])
      if acc == None:
         Session.close()
         return jsonify({"msg": "Incompleted", "error": "Account not found", "info": ""})
      if acc.ID_Permission > 2:
         Session.close()
         return jsonify({"msg": "Incompleted", "error": "No permission", "info": ""})
      
      info = request.get_json()
      new_status = dbm.PostStatus(
         Status = info['status'],
         Information = info['info'],
         ID_Post = info['post']
      )
      Session.add(new_status)
      Session.commit()
      return jsonify({"msg": "Completed", "error": "", "info": new_status.ID})

   except Exception as e:
      Session.rollback()
      return jsonify({"msg": "Incompleted", "error": str(e), "info": ""})