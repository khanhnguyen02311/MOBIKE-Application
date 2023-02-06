from flask import Flask, Blueprint, request, jsonify
import sqlalchemy.orm as sqlorm
from flask_jwt_extended import jwt_required, get_jwt_identity
from components.dbsettings import new_Scoped_session
from components import dbmodels as dbm, dbschemas as dbs
from components.inserter import SaveImage

bppost = Blueprint('bppost', __name__)


@bppost.route("/post/new/vehicle", methods=['POST'])
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


@bppost.route("/post/new/image", methods=['POST'])
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
   
   
@bppost.route("/post/all", methods=["GET"])
@jwt_required()
def getallpost():
   current_user = get_jwt_identity()   
   if current_user is None:
      return jsonify({"msg": "Incompleted", "error": "Invalid token", "info": ""})
   schema = dbs.PostSchemaShort()
   Session = new_Scoped_session()
   try:
      acc = Session.query(dbm.Account).get(current_user['ID'])
      if acc == None:
         Session.close()
         return jsonify({"msg": "Incompleted", "error": "Account not found", "info": ""})
      
      posts = Session.query(dbm.Post).options(sqlorm.joinedload(dbm.Post.rel_Image)).filter(dbm.Post.ID_Account == acc.ID).order_by(dbm.Post.ID.desc()).all()
      posts_inactive = {}
      posts_active = {}
      posts_sold = {}
      posts_deactivated = {}
      for item in posts:
         status = Session.query(dbm.PostStatus).filter(dbm.PostStatus.ID_Post == item.ID).order_by(dbm.PostStatus.ID.desc()).first()
         if status.Status == 0:
            posts_inactive[len(posts_inactive)] = schema.dump(item)
         elif status.Status == 1:
            posts_active[len(posts_active)] = schema.dump(item)
         elif status.Status == 2:
            posts_sold[len(posts_sold)] = schema.dump(item)
         elif status.Status == 3:
            posts_deactivated[len(posts_deactivated)] = schema.dump(item)
      
      json_posts = {}
      json_posts['inactive'] = posts_inactive
      json_posts['active'] = posts_active
      json_posts['sold'] = posts_sold
      json_posts['deactivated'] = posts_deactivated
      Session.close()
      return jsonify({"msg": "Completed", "error": "", "info": json_posts})
      
   except Exception as e:
      Session.rollback()
      return jsonify({"msg": "Incompleted", "error": str(e), "info": ""})
   
   
@bppost.route("/post/<id>", methods=["GET"])
def getdetailpost(id):
   postschema = dbs.PostSchema()
   vehicleschema = dbs.VehicleInfoSchema()
   statusschema = dbs.PostStatusSchema()
   Session = new_Scoped_session()
   try:      
      post = Session.query(dbm.Post).options(sqlorm.joinedload(dbm.Post.rel_VehicleInfo),
                                             sqlorm.joinedload(dbm.Post.rel_Image),
                                             sqlorm.joinedload(dbm.Post.rel_Address)).get(id)
      statuses = Session.query(dbm.PostStatus).filter(dbm.PostStatus.ID_Post == id).order_by(dbm.PostStatus.ID.desc()).all()
      json_statuses = {}
      for i, item in enumerate(statuses):
         json_statuses[i] = statusschema.dump(item)
      json_data = {}
      json_data['post'] = postschema.dump(post)
      json_data['vehicleinfo'] = vehicleschema.dump(post.rel_VehicleInfo)
      json_data['address'] = vehicleschema.dump(post.rel_Address)
      json_data['statuses'] = json_statuses
      Session.commit()
      return jsonify({"msg": "Completed", "error": "", "info": json_data})
         
   except Exception as e:
      Session.rollback()
      return jsonify({"msg": "Incompleted", "error": str(e), "info": ""})
   
   
@bppost.route("/post/<int:id>/edit", methods=["POST", "PUT"])
@jwt_required()
def editpost(id):
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
      
      post = Session.query(dbm.Post).options(sqlorm.joinedload(dbm.Post.rel_VehicleInfo)).get(id)
      if post is None or post.ID_Account != current_user['ID']:
         return jsonify({"msg": "Incompleted", "error": "Post not found or not owned by your account", "info": ""})
      
      post.Title = info['P_title']
      post.Content = info['P_content']
      post.Pricetag = info['P_price']
      post.ID_Address = info['P_address']
      post.rel_Image = info['P_images']
      
      post.rel_VehicleInfo.Vehicle_name = info['V_name']
      post.rel_VehicleInfo.Odometer = info['V_odometer']
      post.rel_VehicleInfo.License_plate = info['V_license']
      post.rel_VehicleInfo.Manufacture_year = info['V_mnf']
      post.rel_VehicleInfo.Cubic_power = info['V_cubic']
      post.rel_VehicleInfo.ID_VehicleBrand = info['V_brand']
      post.rel_VehicleInfo.ID_VehicleLineup = info['V_lineup']
      post.rel_VehicleInfo.ID_VehicleType = info['V_type']
      post.rel_VehicleInfo.ID_Condition = info['V_condition']
      post.rel_VehicleInfo.ID_Color = info['V_color']
      
      new_poststatus = dbm.PostStatus(
         Status = 0,
         ID_Post = info['P_ID'],
         Information = "Post edited by user."
      )
      
      Session.add(new_poststatus)
      Session.commit()
      return jsonify({"msg": "Completed", "error": "", "info": "Post edited, waiting for verification"})
   
   except Exception as e:
      Session.rollback()
      return jsonify({"msg": "Incompleted", "error": str(e), "info": ""})


@bppost.route("/post/<int:id>/deactivate", methods=["POST", "PUT"])
@jwt_required()
def deactivatepost(id):
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
      
      post = Session.query(dbm.Post).get(id)
      if post is None or post.ID_Account != current_user['ID']:
         return jsonify({"msg": "Incompleted", "error": "Post not found or not owned by your account", "info": ""})
      
      new_poststatus = dbm.PostStatus(
         Status = 3,
         ID_Post = info['P_ID'],
         Information = "Post deactivated by user."
      )
      Session.add(new_poststatus)
      Session.commit()
      return jsonify({"msg": "Completed", "error": "", "info": "Post deactivated"})
   
   except Exception as e:
      Session.rollback()
      return jsonify({"msg": "Incompleted", "error": str(e), "info": ""})