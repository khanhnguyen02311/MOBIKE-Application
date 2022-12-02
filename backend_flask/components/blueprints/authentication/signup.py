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
   
      
def setup_account(Session, a_email, a_username, a_password, a_type, a_permission, i_name, i_phone, i_image=None):
   try:
      accountstat = dbm.AccountStat()
      account = dbm.Account(Username=a_username, Password=a_password, Email=a_email, Account_type=a_type, ID_Permission=a_permission)
      accountinfo = dbm.AccountInfo(Name=i_name, Phone_number=i_phone)
      if i_image != None: 
         # SAVE IMAGE TO SYSTEM AND ADD TO IMAGE TABLE
         pass
      Session.add(accountstat)
      Session.flush()
      accountinfo.ID_AccountStat = accountstat.ID
      Session.add(accountinfo)
      Session.flush()
      account.ID_AccountInfo = accountinfo.ID
      Session.add(account)
      Session.flush()
      return [True, account]
   except Exception as e:
      return [False, str(e)]

   
@bpsignup.route('/signup', methods=['POST'])
def signup():
   schema = dbs.AccountSchema()
   Session = new_Session()
   try:
      email = request.json['email']
      username = request.json['username']
      phone = request.json['phone']
      
      existed_email = Session.query(dbm.Account.Email).filter(dbm.Account.Email==email, dbm.Account.Account_type==0).first()
      if (not existed_email is None):
         return signup_output("Incompleted", "Email existed", "")
      
      existed_username = Session.query(dbm.Account.Username).filter(dbm.Account.Username==username, dbm.Account.Account_type==0).first()
      if (not existed_username is None):
         return signup_output("Incompleted", "Username existed", "")

      password = make_hash(request.json['password'])
      
      # new_account = dbm.Account(Username=username, Password=password, Email=email, Account_type=0, ID_Permission=4)
      # Session.add(new_account)
      # Session.commit()
      # access_token = create_access_token(identity=schema.dump(new_account))
      # return signup_output("Completed", "", access_token)
      
      output = setup_account(Session, email, username, password, 0, 4, username, phone)
      if output[0] == True:
         Session.commit()
         access_token = create_access_token(identity=schema.dump(output[1]))
         return signup_output("Completed", "", access_token)
      else:
         Session.rollback()
         signup_output("Incompleted", output[1], "")
   
   except Exception as e:
      Session.rollback()
      return signup_output("Incompleted", str(e), "")