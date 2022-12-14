import json
from datetime import datetime
import sqlalchemy.orm as sqlorm
from flask import Flask, Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from components.dbsettings import new_Scoped_session
from components import dbmodels as dbm, dbschemas as dbs

bpaccount = Blueprint('bpaccount', __name__)


@bpaccount.route('/me', methods = ['GET'])
@jwt_required()
def protected():
   # Access the identity of the current user with get_jwt_identity
   current_user = get_jwt_identity()
   #return jsonify(logged_in_as=current_user), 200 # ok
   return jsonify(current_user)#, 200 # ok


@bpaccount.route("/getinfo", methods=['GET'])
@jwt_required()
def getinfo():
   current_user = get_jwt_identity()   
   if current_user is None:
      return jsonify({"message": "Incompleted", "error": "Invalid token", "info": ""})
   
   schema = dbs.AccountInfoSchema()
   Session = new_Scoped_session()
   try:
      acc = Session.query(dbm.Account).get(current_user['ID'])
      if acc == None:
         Session.close()
         return jsonify({"message": "Incompleted", "error": "Account not found", "info": ""})
      acc_info = Session.query(dbm.AccountInfo).get(acc.ID_AccountInfo)
      Session.close()
      return jsonify({"message": "Completed", "error": "", "info": schema.dump(acc_info)})
      
   except Exception as e:
      Session.close()
      return jsonify({"message": "Incompleted", "error": str(e), "info": ""})
   

@bpaccount.route("/getinfo3", methods=['GET'])
@jwt_required()
def getinfo3():
   current_user = get_jwt_identity()   
   if current_user is None:
      return jsonify({"message": "Incompleted", "error": "Invalid token", "info": ""})

   schema = dbs.DetaillAccountSchema()
   Session = new_Scoped_session()
   try:
      # acc = Session.query(dbm.Account.ID, dbm.AccountInfo.Name, dbm.AccountInfo.Phone_number, dbm.AccountInfo.Identification_number, dbm.AccountInfo.Birthdate).join(dbm.AccountInfo, dbm.Account.ID == dbm.AccountInfo.ID)
      # acc = Session.query(dbm.Account).options(sqlorm.joinedload(dbm.Account.rel_AccountInfo)).get(current_user['ID'])
      acc = Session.query(dbm.Account).get(current_user['ID'])
      return jsonify({"message": "Completed", "error": "", "info": schema.dump(acc)})
      # if acc == None:
      #    Session.close()
      #    return jsonify({"message": "Incompleted", "error": "Account not found", "info": acc})
      # # acc_info = Session.query(dbm.AccountInfo).get(acc.ID_AccountInfo)
      # Session.close()
      # return jsonify({"message": "Completed", "error": "", "info": jsonify(acc)})
      
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
   Session = new_Scoped_session()
   try:
      acc = Session.query(dbm.Account).get(current_user['ID'])
      if acc == None:
         Session.close()
         return jsonify({"message": "Incompleted", "error": "Account not found", "info": ""})
      else:
         acc_info = Session.query(dbm.AccountInfo).get(acc.ID_AccountInfo)
         acc_info.Name = info['name']
         acc_info.Birthdate = datetime.strptime(info['birth'], '%m/%d/%Y'), 
         acc_info.Gender = info['gender']
         acc_info.Phone_number = info['phone']
         acc_info.Identification_number = info['idt']
         Session.commit()
         return jsonify({"message": "Completed", "error": ""})
   
   except Exception as e:
      Session.rollback()
      return jsonify({"message": "Incompleted", "error": str(e)})
   

@bpaccount.route("/getaddress", methods = ['GET'])
@jwt_required()
def getaddress():
   current_user = get_jwt_identity()   
   if current_user is None:
      return jsonify({"message": "Incompleted", "error": "Invalid token", "info": ""})
   schema = dbs.AddressSchema()
   Session = new_Scoped_session()
   try:
      acc = Session.query(dbm.Account).get(current_user['ID'])
      if acc == None:
         Session.close()
         return jsonify({"message": "Incompleted", "error": "Account not found", "info": ""})
      addresses = Session.query(dbm.Address).filter(dbm.Address.ID_AccountInfo==acc.ID_AccountInfo).order_by(dbm.Address.ID.desc()).all()
      Session.commit()
      json_addresses = {}
      for index, item in enumerate(addresses):
         json_addresses[index] = schema.dump(item)
      print(json_addresses)
      return jsonify({"message": "Completed", "error": "", "info": json_addresses})
   except Exception as e:
      Session.rollback()
      return jsonify({"message": "Incompleted", "error": str(e)})
   

@bpaccount.route("/addaddress", methods = ['POST'])
@jwt_required()
def addaddress():
   current_user = get_jwt_identity()   
   if current_user is None:
      return jsonify({"message": "Incompleted", "error": "Invalid token", "info": ""})
   info = request.get_json()
   schema = dbs.AddressSchema()
   Session = new_Scoped_session()
   try:
      acc = Session.query(dbm.Account).get(current_user['ID'])
      if acc == None:
         Session.close()
         return jsonify({"message": "Incompleted", "error": "Account not found", "info": ""})
      new_address = dbm.Address(
         Detail_address=info['detail'], 
         ID_AccountInfo=acc.ID_AccountInfo, 
         ID_City=info['city'], 
         ID_District=info['district'], 
         ID_Ward=info['ward'])
      Session.add(new_address)
      Session.commit()
      return jsonify({"message": "Completed", "error": "", "info": schema.dump(new_address)})
   except Exception as e:
      Session.rollback()
      return jsonify({"message": "Incompleted", "error": str(e)})
   

@bpaccount.route("/deladdress/<int:id>", methods = ['DELETE'])
@jwt_required()
def deladdress(id):
   current_user = get_jwt_identity()   
   if current_user is None:
      return jsonify({"message": "Incompleted", "error": "Invalid token"})
   info = request.get_json()
   Session = new_Scoped_session()
   try:
      acc = Session.query(dbm.Account).get(current_user['ID'])
      if acc == None:
         Session.close()
         return jsonify({"message": "Incompleted", "error": "Account not found", "info": ""})
      address = Session.query(dbm.Address).get(id)
      if acc.ID_AccountInfo != address.ID_AccountInfo:
         Session.close()
         return jsonify({"message": "Incompleted", "error": "Cannot delete other user's address"})
      Session.remove(address)
      Session.commit()
      return jsonify({"message": "Completed", "error": ""})
   except Exception as e:
      Session.rollback()
      return jsonify({"message": "Incompleted", "error": str(e)})