import json
from datetime import datetime
from flask import Flask, Blueprint, request, jsonify
import sqlalchemy.orm as sqlorm
from flask_jwt_extended import jwt_required, get_jwt_identity
from components.dbsettings import new_Scoped_session
from components import dbmodels as dbm, dbschemas as dbs
from components.inserter import SaveImage

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
         ID_VehicleBrand = info['brand'],
         ID_VehicleLineup = info['lineup'],
         ID_VehicleType = info['type'],
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
   if 'file' not in request.files:
      return jsonify({"msg": "Completed", "error": "No file path", "info": ""})
   current_user = get_jwt_identity()
   if current_user is None:
      return jsonify({"msg": "Incompleted", "error": "Invalid token", "info": ""})
   
   f = request.files['file']
   Session = new_Scoped_session()
   try:
      acc = Session.query(dbm.Account).get(current_user['ID'])
      if acc == None:
         Session.close()
         return jsonify({"msg": "Incompleted", "error": "Account not found", "info": ""})
      output = SaveImage(Session, f, 1)
      if output[0]: 
         Session.commit()
         return jsonify({'msg': 'Completed', "error": "", "info": output[1].ID})
      else: 
         Session.rollback()
         return jsonify({'msg': 'Incompleted', "error": output[1], "info": ""})
      
   except Exception as e:
      Session.rollback()
      return jsonify({'msg': 'Incompleted', 'error': str(e), "info": ""})


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
         Status = 0,
         ID_Post = new_post.ID,
         Information = "Post created by user."
      )
      Session.add(new_poststatus)
      Session.flush()
      
      list_image = info['images']
      postimages = Session.query(dbm.Image).filter(dbm.Image.ID.in_(list_image)).all()
      for img in postimages:
         img.ID_Post = new_post.ID
      Session.commit()
      return jsonify({"msg": "Completed", "error": "", "info": new_post.ID})
      
   except Exception as e:
      Session.rollback()
      return jsonify({"msg": "Incompleted", "error": str(e), "info": ""})
   
   
# @bppost.route("/post/get/all", methods=["POST"])
# @jwt_required()
# def newpost():
#    current_user = get_jwt_identity()   
#    if current_user is None:
#       return jsonify({"msg": "Incompleted", "error": "Invalid token", "info": ""})
   
#    Session = new_Scoped_session()
#    try:
#       acc = Session.query(dbm.Account).get(current_user['ID'])
#       if acc == None:
#          Session.close()
#          return jsonify({"msg": "Incompleted", "error": "Account not found", "info": ""})
      
#       posts = Session.query(dbm.Post).filter(dbm.Post.ID_Account == acc.ID).all()
#       posts_inactive = {}
#       posts_active = {}
#       posts_sold = {}
#       posts_reported = {}
#       for index, item in enumerate(posts):
#          image = Session.query(dbm.Image).filter(dbm.Image.ID_Post == item.ID).first()
#          status = Session.query(dbm.PostStatus).filter(dbm.PostStatus.ID_Post == item.ID).order_by(dbm.PostStatus.ID.desc()).first()
#       #    json_colors[index] = schema.dump(item)
#       # return jsonify({"msg": "Completed", "error": "", "info": json_colors})
#       # CONTINUE
      
#    except Exception as e:
#       Session.rollback()
#       return jsonify({"msg": "Incompleted", "error": str(e), "info": ""})
   
   
