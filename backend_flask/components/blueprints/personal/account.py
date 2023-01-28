import os
from datetime import datetime
import sqlalchemy.orm as sqlorm
from flask import Flask, Blueprint, request, jsonify, send_file
from flask_jwt_extended import jwt_required, get_jwt_identity
from components.dbsettings import new_Scoped_session
from components import dbmodels as dbm, dbschemas as dbs
from components.inserter import STORAGE_PATH, SaveImage

bpaccount = Blueprint('bpaccount', __name__)


@bpaccount.route('/me', methods = ['GET'])
@jwt_required()
def protected():
   # Access the identity of the current user with get_jwt_identity
   current_user = get_jwt_identity()
   #return jsonify(logged_in_as=current_user), 200 # ok
   return jsonify(current_user)#, 200 # ok


@bpaccount.route("/info/get", methods=['GET'])
@jwt_required()
def getinfo():
   current_user = get_jwt_identity()   
   if current_user is None:
      return jsonify({"msg": "Incompleted", "error": "Invalid token", "info": ""})
   
   schema = dbs.AccountInfoSchema()
   Session = new_Scoped_session()
   try:
      acc = Session.query(dbm.Account).get(current_user['ID'])
      if acc == None:
         Session.close()
         return jsonify({"msg": "Incompleted", "error": "Account not found", "info": ""})
      acc_info = Session.query(dbm.AccountInfo).get(acc.ID_AccountInfo)
      Session.close()
      return jsonify({"msg": "Completed", "error": "", "info": schema.dump(acc_info)})
      
   except Exception as e:
      Session.close()
      return jsonify({"msg": "Incompleted", "error": str(e), "info": ""})
   
@bpaccount.route("/info/set", methods=['POST', 'PUT'])
@jwt_required()
def changeinfo():
   current_user = get_jwt_identity()
   if current_user is None:
      return jsonify({"msg": "Incompleted", "error": "Invalid token", "info": ""})
   
   schema = dbs.AccountInfoSchema()
   info = request.get_json()
   Session = new_Scoped_session()
   try:
      acc = Session.query(dbm.Account).get(current_user['ID'])
      if acc == None:
         Session.close()
         return jsonify({"msg": "Incompleted", "error": "Account not found", "info": ""})
      else:
         acc_info = Session.query(dbm.AccountInfo).get(acc.ID_AccountInfo)
         acc_info.Name = info['Name']
         acc_info.Birthdate = datetime.strptime(info['Birthday'], '%d/%m/%Y'), 
         acc_info.Gender = info['Gender']
         acc_info.Phone_number = info['Phone_number']
         acc_info.Identification_number = info['Identification_number']
         Session.commit()
         return jsonify({"msg": "Completed", "error": "", "info": ""})
   
   except Exception as e:
      Session.rollback()
      return jsonify({"msg": "Incompleted", "error": str(e), "info": ""})
   

@bpaccount.route("/address/get", methods = ['GET'])
@jwt_required()
def getaddress():
   current_user = get_jwt_identity()   
   if current_user is None:
      return jsonify({"msg": "Incompleted", "error": "Invalid token", "info": ""})
   schema = dbs.AddressSchema()
   Session = new_Scoped_session()
   try:
      acc = Session.query(dbm.Account).get(current_user['ID'])
      if acc == None:
         Session.close()
         return jsonify({"msg": "Incompleted", "error": "Account not found", "info": ""})
      addresses = Session.query(dbm.Address).filter(dbm.Address.ID_AccountInfo==acc.ID_AccountInfo).order_by(dbm.Address.ID.desc()).all()
      Session.commit()
      json_addresses = {}
      for index, item in enumerate(addresses):
         json_addresses[index] = schema.dump(item)
      return jsonify({"msg": "Completed", "error": "", "info": json_addresses})
   except Exception as e:
      Session.rollback()
      return jsonify({"msg": "Incompleted", "error": str(e), "info": ""})
   

@bpaccount.route("/address/set", methods = ['POST'])
@jwt_required()
def addaddress():
   current_user = get_jwt_identity()   
   if current_user is None:
      return jsonify({"msg": "Incompleted", "error": "Invalid token", "info": ""})
   info = request.get_json()
   schema = dbs.AddressSchema()
   Session = new_Scoped_session()
   try:
      acc = Session.query(dbm.Account).get(current_user['ID'])
      if acc == None:
         Session.close()
         return jsonify({"msg": "Incompleted", "error": "Account not found", "info": ""})
      new_address = dbm.Address(
         Detail_address=info['detail'], 
         ID_AccountInfo=acc.ID_AccountInfo, 
         ID_City=info['city'], 
         ID_District=info['district'], 
         ID_Ward=info['ward'])
      Session.add(new_address)
      Session.commit()
      return jsonify({"msg": "Completed", "error": "", "info": schema.dump(new_address)})
   except Exception as e:
      Session.rollback()
      return jsonify({"msg": "Incompleted", "error": str(e), "info": ""})
   

@bpaccount.route("/address/del/<int:id>", methods = ['DELETE'])
@jwt_required()
def deladdress(id):
   current_user = get_jwt_identity()   
   if current_user is None:
      return jsonify({"msg": "Incompleted", "error": "Invalid token", "info": ""})
   Session = new_Scoped_session()
   try:
      acc = Session.query(dbm.Account).get(current_user['ID'])
      if acc == None:
         Session.close()
         return jsonify({"msg": "Incompleted", "error": "Account not found", "info": ""})
      address = Session.query(dbm.Address).get(id)
      if acc.ID_AccountInfo != address.ID_AccountInfo:
         Session.close()
         return jsonify({"msg": "Incompleted", "error": "Cannot delete other user's address"})
      Session.delete(address)
      Session.commit()
      return jsonify({"msg": "Completed", "error": "", "info": ""})
   except Exception as e:
      Session.rollback()
      return jsonify({"msg": "Incompleted", "error": str(e), "info": ""})
   
   
@bpaccount.route('/avatar/set', methods = ['POST'])
@jwt_required()
def setavatar():
   if 'file' not in request.files:
      return jsonify({"msg": "Completed", "error": "No file path", "info": ""})
   current_user = get_jwt_identity()
   if current_user is None:
      return jsonify({"msg": "Incompleted", "error": "Invalid token", "info": ""})
   
   f = request.files['file']
   Session = new_Scoped_session()
   try:
      acc = Session.query(dbm.Account).options(sqlorm.joinedload(dbm.Account.rel_AccountInfo)).get(current_user['ID'])
      if acc == None:
         Session.close()
         return jsonify({"msg": "Incompleted", "error": "Account not found", "info": ""})
      output = SaveImage(Session, f, 3)
      if output[0]: 
         acc.rel_AccountInfo.ID_Image_Profile = output[1].ID
         Session.commit()
         return jsonify({'msg': 'Completed', "error": "", "info": output[1].ID})
      else: 
         Session.rollback()
         return jsonify({'msg': 'Incompleted', "error": output[1], "info": ""})
   except Exception as e:
      Session.rollback()
      return jsonify({'msg': 'Incompleted', 'error': str(e)})
   
   
@bpaccount.route('/avatar/get', methods = ['GET'])
@jwt_required()
def getavatar():
   current_user = get_jwt_identity()
   if current_user is None:
      return jsonify({"msg": "Incompleted", "error": "Invalid token", "info": ""})

   Session = new_Scoped_session()
   try:
      acc = Session.query(dbm.Account).options(sqlorm.joinedload(dbm.Account.rel_AccountInfo)).get(current_user['ID'])
      if acc == None:
         Session.close()
         return jsonify({"msg": "Incompleted", "error": "Account not found", "info": ""})
   
      if acc.rel_AccountInfo.ID_Image_Profile is None:
         return jsonify({"msg": "Incompleted", "error": "No avatar", "info": ""})
      
      image = Session.query(dbm.Image).get(acc.rel_AccountInfo.ID_Image_Profile)
      Session.close()
      ext = image.Filename.split('.')[-1]
      return send_file(STORAGE_PATH + "user/" + image.Filename, mimetype = 'image/' + ext)
   
   except Exception as e:
      Session.rollback()
      return jsonify({'msg': 'Incompleted', 'error': str(e)})
   
   
@bpaccount.route('/avatar/del', methods = ['DELETE'])
@jwt_required()
def delavatar():
   current_user = get_jwt_identity()
   if current_user is None:
      return jsonify({"msg": "Incompleted", "error": "Invalid token", "info": ""})

   Session = new_Scoped_session()
   try:
      acc = Session.query(dbm.Account).options(sqlorm.joinedload(dbm.Account.rel_AccountInfo)).get(current_user['ID'])
      if acc == None:
         Session.close()
         return jsonify({"msg": "Incompleted", "error": "Account not found", "info": ""})
      acc.rel_AccountInfo.ID_Image_Profile = None
      Session.commit()
      return jsonify({"msg": "Completed", "error": "", "info": ""})
   except Exception as e:
      Session.rollback()
      return jsonify({'msg': 'Incompleted', 'error': str(e), "info": ""})