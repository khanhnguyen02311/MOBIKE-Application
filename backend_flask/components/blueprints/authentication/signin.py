from flask import Flask, Blueprint, request, jsonify
import flask_jwt_extended as jwte
from components.dbsettings import new_Session
from components import dbmodels as dbm, dbschemas as dbs
from components.security import make_hash, check_hash

bpsignin = Blueprint('bpsignin', __name__)


@bpsignin.route('/signin', methods = ['GET'])
def signin():
   schema = dbs.AccountSchema()
   Session = new_Session()
   try:
      usernameOrEmail = request.json["username_or_email"]
      password = request.json["password"]
      
      acc = Session.query(dbm.Account).filter(dbm.Account.Email==usernameOrEmail).first() or \
            Session.query(dbm.Account).filter(dbm.Account.Username==usernameOrEmail).first()
         
      if (acc != None):
         result = check_hash(acc.Password, password)
         if (result[0]):
            if result[1]:
               Session.get(dbm.Account, acc.ID).update({"Password": make_hash(password)}, synchronize_session="fetch")
               Session.commit()
            token = jwte.create_access_token(identity=schema.dump(acc),expires_delta=False)
            Session.close()
            return jsonify({"message": "Completed", "error": "", "token": token}), 200
         else: 
            Session.close()
            return jsonify({"message": "Incompleted", "error": "Wrong username or password"}), 401
         
      else:
         Session.close()
         return jsonify({"message": "Incompleted", "error": "Wrong username or password"}), 401
      
   except Exception as e:
      Session.rollback()
      Session.close()
      return jsonify({"message": "Incompleted", "error": str(e)}), 409

