from flask import Flask, Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from components.dbsettings import new_Session
from components import dbmodels as dbm, dbschemas as dbs
from components.security import make_hash

bpsignup = Blueprint('bpsignup', __name__)


def signup_output(message, error, access_token):
   return jsonify({
      "message": message, 
      "error": error, 
      "token": access_token})
   
@bpsignup.route('/signup', methods=['POST'])
def signup():
   schema = dbs.AccountSchema()
   Session = new_Session()
   try:
      email = request.json['email']
      username = request.json['username']
      
      existedEmail = Session.query(dbm.Account.Email).filter(dbm.Account.Email==email, dbm.Account.Account_type==0).first()
      if (not existedEmail is None):
         return signup_output("Incompleted", "Email existed", "")
      
      existedUsername = Session.query(dbm.Account.Username).filter(dbm.Account.Username==username, dbm.Account.Account_type==0).first()
      if (not existedUsername is None):
         return signup_output("Incompleted", "Username existed", "")

      password = make_hash(request.json['password'])
      
      new_account = dbm.Account(Username=username, Password=password, Email=email, Account_type=0, ID_Permission=4)
      access_token = create_access_token(identity=schema.dump(new_account))
      Session.add(new_account)
      Session.commit()
      Session.close()
      return signup_output("Completed", "", access_token)
   
   except Exception as e:
      Session.rollback()
      Session.close()
      return signup_output("Incompleted", str(e), "")