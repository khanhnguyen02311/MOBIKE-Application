from flask import Flask, Blueprint, request, jsonify
import flask_jwt_extended as jwte
from components.dbsettings import new_Session
from components import dbmodels as dbm, dbschemas as dbs
from components.security import make_hash

bpsignup = Blueprint('bpsignup', __name__)


@bpsignup.route('/signup', methods=['POST'])
def signup():
   Session = new_Session()
   try:
      email = request.json['email']
      username = request.json['username']
      
      existedEmail = Session.query(dbm.Account.Email).filter(dbm.Account.Email==email, dbm.Account.Account_type==0).first()
      if (not existedEmail is None):
         return jsonify({"message": "Incompleted", "error": "Email existed"}), 409
      
      existedUsername = Session.query(dbm.Account.Username).filter(dbm.Account.Username==username, dbm.Account.Account_type==0).first()
      if (not existedUsername is None):
         return jsonify({"message": "Incompleted", "error": "Username existed"}), 409

      password = make_hash(request.json['password'])
      
      new_account = dbm.Account(Username=username, Password=password, Email=email, Account_type=0, ID_Permission=4)
      Session.add(new_account)
      Session.commit()
      Session.close()
      return jsonify({"message": "Completed", "error": ""}), 201
   
   except Exception as e:
      Session.rollback()
      Session.close()
      return jsonify({"message": "Incompleted", "error": str(e)}), 409