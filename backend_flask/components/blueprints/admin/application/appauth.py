from flask import Flask, Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import flask_jwt_extended as jwte
from components.dbsettings import new_Scoped_session
from components import dbmodels as dbm, dbschemas as dbs
from components.security import check_hash, make_hash

bpappadminauth = Blueprint('bpappadminauth', __name__)
def signin_output(message, error, access_token):
   return jsonify({
      "msg": message, 
      "error": error, 
      "token": access_token})
   

@bpappadminauth.route('/signin', methods = ['POST'])
def signin():
   schema = dbs.AccountSchema()
   Session = new_Scoped_session()
   try:
      username_or_email = request.json["username_or_email"]
      password = request.json["password"]
      
      acc = Session.query(dbm.Account).filter(dbm.Account.Email==username_or_email, dbm.Account.ID_Permission==2).first() or \
            Session.query(dbm.Account).filter(dbm.Account.Username==username_or_email, dbm.Account.ID_Permission==2).first()
         
      if (acc != None):
         result = check_hash(acc.Password, password)
         if (result[0]):
            if result[1]:
               Session.get(dbm.Account).update({"Password": make_hash(password)}, synchronize_session="fetch")
            access_token = create_access_token(identity=schema.dump(acc))
            Session.commit()
            return signin_output("Completed", "", access_token)
         
      Session.close()
      return signin_output("Incompleted", "Wrong username or password", "")

   except Exception as e:
      Session.rollback()
      return signin_output("Incompleted", str(e), "")
