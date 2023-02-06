from datetime import datetime
import sqlalchemy.orm as sqlorm
from flask import Flask, Blueprint, request, jsonify, send_file
from flask_jwt_extended import jwt_required, get_jwt_identity
from components.dbsettings import new_Scoped_session
from components import dbmodels as dbm, dbschemas as dbs
from components.security import check_hash, make_hash

bpaccountauth = Blueprint('bpaccountauth', __name__)


@bpaccountauth.route('/password/change', methods = ['POST', 'PUT'])
@jwt_required()
def changepassword():
   current_user = get_jwt_identity()   
   if current_user is None:
      return jsonify({"msg": "Incompleted", "error": "Invalid token", "info": ""})
   
   Session = new_Scoped_session()
   try:
      acc = Session.query(dbm.Account).get(current_user['ID'])
      if acc == None:
         Session.close()
         return jsonify({"msg": "Incompleted", "error": "Account not found", "info": ""})
      
      info = request.get_json()
      if check_hash(acc.Password, info["old_password"]):
         acc.Password = make_hash(info['new_password'])
         Session.commit()
         return jsonify({"msg": "Completed", "error": "", "info": "Password changed"})
      else:
         Session.close()
         return jsonify({"msg": "Incompleted", "error": "Old password not true", "info": ""})
   
   except Exception as e:
      Session.close()
      return jsonify({"msg": "Incompleted", "error": str(e), "info": ""})
   

@bpaccountauth.route('/password/forgot', methods = ['POST', 'PUT'])
def forgotpassword():
   pass