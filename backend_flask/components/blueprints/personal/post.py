import json
from datetime import datetime
from flask import Flask, Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from components.dbsettings import new_Scoped_session
from components import dbmodels as dbm, dbschemas as dbs

bppost = Blueprint('bppost', __name__)


@bppost.route("/post/vehicle/new", methods=['POST'])
@jwt_required()
def newvehicle():
   current_user = get_jwt_identity()   
   if current_user is None:
      return jsonify({"msg": "Incompleted", "error": "Invalid token", "info": ""})
   
   info = request.get_json()
   Session = new_Scoped_session()
   try:
      acc = Session.query(dbm.Account).get(current_user['ID'])
      if acc == None:
         Session.close()
         return jsonify({"msg": "Incompleted", "error": "Account not found", "info": ""})
      
      new_vehicleinfo = dbm.VehicleInfo(
         Vehicle_name = info['name'],
         Odometer = info['odometer'],
         License_plate = info['license'],
         Manufacture_year = info['mnf'],
         Cubic_power = info['cubic'],
         ID_VehicleBrand = info['vehiclebrand'],
         ID_VehicleLineup = info['vehiclelineup'],
         ID_VehicleType = info['vehicletype'],
         ID_Condition = info['condition'],
         ID_Color = info['color']
      )
      Session.add(new_vehicleinfo)
      Session.commit()
      return jsonify({"msg": "Completed", "error": "", "info": new_vehicleinfo.ID})
   
   except Exception as e:
      Session.rollback()
      return jsonify({"msg": "Incompleted", "error": str(e), "info": ""})


#CONTINUE
@bppost.route("/post/image/new", methods=['POST'])
@jwt_required()
def newpostimage():
   current_user = get_jwt_identity()   
   if current_user is None:
      return jsonify({"msg": "Incompleted", "error": "Invalid token", "info": ""})
   
   info = request.get_json()
   Session = new_Scoped_session()
   try:
      acc = Session.query(dbm.Account).get(current_user['ID'])
      if acc == None:
         Session.close()
         return jsonify({"msg": "Incompleted", "error": "Account not found", "info": ""})
      
      Session.commit()
      return jsonify({"msg": "Completed", "error": "", "info": ""})
   
   except Exception as e:
      Session.rollback()
      return jsonify({"msg": "Incompleted", "error": str(e), "info": ""})


@bppost.route("/post/new", methods=["POST"])
@jwt_required()
def newpost():
   current_user = get_jwt_identity()   
   if current_user is None:
      return jsonify({"msg": "Incompleted", "error": "Invalid token", "info": ""})
   
   info = request.get_json()
   Session = new_Scoped_session()
   try:
      acc = Session.query(dbm.Account).get(current_user['ID'])
      if acc == None:
         Session.close()
         return jsonify({"msg": "Incompleted", "error": "Account not found", "info": ""})
      
      list_image = info['images']
      ## CHANGE IMAGE'S POST ATTRIBUTE ##
      
      address = Session.query(dbm.Address).get(info['address'])
      if address.ID_AccountInfo != acc.ID_AccountInfo:
         Session.close()
         return jsonify({"msg": "Incompleted", "error": "Invalid address", "info": ""})
      
      new_poststat = dbm.PostStat()
      Session.add(new_poststat)
      Session.flush()
      new_post = dbm.Post(
         Title = info['title'],
         Content = info['content'],
         Pricetag = info['price'],
         ID_Account = current_user['ID'],
         ID_Address = info['address'],
         ID_PostStat = new_poststat.ID,
         ID_VehicleInfo = info['vehicleinfo']
      )
      Session.add(new_post)
      Session.flush()
      new_poststatus = dbm.PostStatus(
         Status=0,
         ID_Post = new_post.ID
      )
      Session.add(new_poststatus)
      Session.commit()
      return jsonify({"msg": "Completed", "error": "", "info": new_post.ID})
      
   except Exception as e:
      Session.rollback()
      return jsonify({"msg": "Incompleted", "error": str(e), "info": ""})