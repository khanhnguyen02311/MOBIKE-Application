from datetime import datetime
from flask import Flask, Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from components.dbsettings import new_Session
from components import dbmodels as dbm, dbschemas as dbs

bpaccount = Blueprint('bpaccount', __name__)


@bpaccount.route("/getinfo", methods=['GET'])
@jwt_required()
def getinfo():
   current_user = get_jwt_identity()   
   if current_user is None:
      return jsonify({"message": "Incompleted", "error": "Invalid token", "info": ""})
   
   schema = dbs.AccountInfoSchema()
   Session = new_Session()
   try:
      acc_info = Session.query(dbm.Account, dbm.AccountInfo).join("rel_AccountInfo").filter(dbm.Account.ID==current_user['ID']).first()
      Session.close()
      return jsonify({"message": "Completed", "error": "", "info": schema.dump(acc_info[1])})
      
   except Exception as e:
      Session.close()
      return jsonify({"message": "Incompleted", "error": str(e), "info": ""})
   

@bpaccount.route("/setinfo", methods=['POST', 'PUT'])
@jwt_required()
def changeinfo():
   current_user = get_jwt_identity()
   if current_user is None:
      return jsonify({"message": "Incompleted", "error": "Invalid token"})
   
   schema = dbs.AccountInfoSchema()
   info = request.get_json()
   Session = new_Session()
   try:
      acc = Session.query(dbm.Account).get(current_user['ID'])
      if acc.ID_AccountInfo == None:
         new_stat = dbm.AccountStat()
         Session.add(new_stat)
         Session.flush()
         Session.refresh(new_stat)
         new_info = dbm.AccountInfo(
            Name = info['name'], 
            Birthdate = datetime.strptime(info['birth'], '%m/%d/%Y'), 
            Gender = info['gender'],
            Phone_number = info['phone'],
            Identification_number = info['idt'],
            ID_AccountStat = new_stat.ID)
         Session.add(new_info)
         Session.flush()
         Session.refresh(new_info) # load the database information back to the variable
         acc.ID_AccountInfo = new_info.ID
         Session.commit()
         Session.close()
         return jsonify({"message": "Completed", "error": ""})
      
      else:
         Session.query(dbm.AccountInfo).get(acc.ID_AccountInfo).update({
            "Name": info['name'], 
            "Birthdate": datetime.strptime(info['birth'], '%m/%d/%Y'), 
            "Gender": info['gender'],
            "Phone_number": info['phone'],
            "Identification_number": info['idt']}, synchronize_session="fetch")
         Session.commit()
         Session.close()
         return jsonify({"message": "Completed", "error": ""})
   
   except Exception as e:
      Session.rollback()
      Session.close()
      return jsonify({"message": "Incompleted", "error": str(e)})
   

## UNDONE
@bpaccount.route("/addaddress", methods = ['POST'])
@jwt_required()
def addaddress():
   current_user = get_jwt_identity()   
   if current_user is None:
      return jsonify({"message": "Incompleted", "error": "Invalid token", "info": ""})
   
   Session = new_Session()
   try:
      pass
   except Exception as e:
      Session.rollback()
      Session.close()
      return jsonify({"message": "Incompleted", "error": str(e)})
   
   
@bpaccount.route("/deladdress", methods = ['DELETE'])
@jwt_required()
def deladdress():
   pass