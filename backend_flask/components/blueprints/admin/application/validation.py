import os
from flask import Flask, Blueprint, jsonify, request
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import flask_jwt_extended as jwte
from components.dbsettings import new_Scoped_session
from components import dbmodels as dbm, dbschemas as dbs
from components.security import check_hash, make_hash
import sqlalchemy.orm as sqlorm
from sqlalchemy import desc

bpappadminval = Blueprint('bpappadminval', __name__)


@bpappadminval.route('/status/set', methods=['POST'])
@jwt_required()
def setpoststatus():
   current_user = get_jwt_identity()
   if current_user is None:
      return jsonify({"msg": "Incompleted", "error": "Invalid token", "info": ""})

   Session = new_Scoped_session()
   try:
      acc = Session.query(dbm.Account).get(current_user['ID'])
      if acc == None:
         Session.close()
         return jsonify({"msg": "Incompleted", "error": "Account not found", "info": ""})
      if acc.ID_Permission > 2:
         Session.close()
         return jsonify({"msg": "Incompleted", "error": "No permission", "info": ""})

      info = request.get_json()
      new_status = dbm.PostStatus(
         Status=info['status'],
         Information=info['info'],
         ID_Post=info['post']
      )
      Session.add(new_status)
      Session.commit()
      return jsonify({"msg": "Completed", "error": "", "info": new_status.ID})

   except Exception as e:
      Session.rollback()
      return jsonify({"msg": "Incompleted", "error": str(e), "info": ""})


@bpappadminval.route('/inactiveposts', methods=['GET'])
@jwt_required()
def getinactivapost():
   current_user = get_jwt_identity()
   if current_user is None:
      return jsonify({"msg": "Incompleted", "error": "Invalid token", "info": ""})

   Session = new_Scoped_session()
   try:
      acc = Session.query(dbm.Account).get(current_user['ID'])
      if acc == None:
         Session.close()
         return jsonify({"msg": "Incompleted", "error": "Account not found", "info": ""})
      if acc.ID_Permission > 2:
         Session.close()
         return jsonify({"msg": "Incompleted", "error": "No permission", "info": ""})

      statuses = Session.query(dbm.PostStatus).order_by(desc(dbm.PostStatus.ID)).all()

      lastestStatus = []
      
      for status in statuses:
         if (status.ID_Post not in lastestStatus):
            lastestStatus.append(status)
            
      inactivatedStatuses = []
      
      for status in lastestStatus:
         if (status.Status == 0):
            inactivatedStatuses.append(status)

      schema = dbs.PostStatusSchema(many=True)
      
      return jsonify({"msg": "Completed", "error": "", "info": schema.dump(inactivatedStatuses)})

   except Exception as e:
      Session.rollback()
      return jsonify({"msg": "Incompleted", "error": str(e), "info": ""})

@bpappadminval.route('/post/<int:id>', methods = ['GET'])
@jwt_required()
def getPost(id):
   current_user = get_jwt_identity()
   if current_user is None:
      return jsonify({"msg": "Incompleted", "error": "Invalid token", "info": ""})
   
   Session = new_Scoped_session()
   try:
      acc = Session.query(dbm.Account).get(current_user['ID'])
      if acc == None:
         Session.close()
         return jsonify({"msg": "Incompleted", "error": "Account not found", "info": ""})
      if acc.ID_Permission > 2:
         Session.close()
         return jsonify({"msg": "Incompleted", "error": "No permission", "info": ""})
      
      postschema = dbs.PostSchema()
      vehicleschema = dbs.VehicleInfoSchema()
      userschema = dbs.AccountInfoSchemaPublic()
      addressschema = dbs.AddressSchemaShort()
      
      status = Session.query(dbm.PostStatus).filter(dbm.PostStatus.ID_Post == id).order_by(dbm.PostStatus.ID.desc()).first()
      if status == None:
         return jsonify({"msg": "Completed", "error": "Post not found", "info": ""})
      
      post = Session.query(dbm.Post).options(sqlorm.joinedload(dbm.Post.rel_VehicleInfo),
                                             sqlorm.joinedload(dbm.Post.rel_Account).subqueryload(dbm.Account.rel_AccountInfo),
                                             sqlorm.joinedload(dbm.Post.rel_Image),
                                             sqlorm.joinedload(dbm.Post.rel_Like),
                                             sqlorm.joinedload(dbm.Post.rel_Rating),
                                             sqlorm.joinedload(dbm.Post.rel_Address)).get(id)
      
      json_data = {}
      json_data['post'] = postschema.dump(post)
      json_data['user'] = userschema.dump(post.rel_Account.rel_AccountInfo)
      json_data['vehicleinfo'] = vehicleschema.dump(post.rel_VehicleInfo)
      json_data['address'] = addressschema.dump(post.rel_Address)
      Session.close()
      return jsonify({"msg": "Completed", "error": "", "info": json_data})

   except Exception as e:
      Session.rollback()
      return jsonify({"msg": "Incompleted", "error": str(e), "info": ""})