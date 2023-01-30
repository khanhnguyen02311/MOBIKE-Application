from flask import Flask, Blueprint, request, jsonify
import sqlalchemy.orm as sqlorm
from flask_jwt_extended import jwt_required, get_jwt_identity
from components.dbsettings import new_Scoped_session
from components import dbmodels as dbm, dbschemas as dbs

bppostsearch = Blueprint("bppostsearch", __name__)


@bppostsearch.route("/post", methods=["GET"])
def searchpost():
   pass


@bppostsearch.route("/post/<id>", methods=["GET"])
def detailpost(id):
   postschema = dbs.PostSchema()
   vehicleschema = dbs.VehicleInfoSchema()
   Session = new_Scoped_session()
   try:
      status = Session.query(dbm.PostStatus).filter(dbm.PostStatus.ID_Post == id).order_by(dbm.PostStatus.ID.desc()).first()
      if status.Status != 1:
         return jsonify({"msg": "Completed", "error": "Post not found", "info": ""})
      
      post = Session.query(dbm.Post).options(sqlorm.joinedload(dbm.Post.rel_VehicleInfo),
                                             sqlorm.joinedload(dbm.Post.rel_Image),
                                             sqlorm.joinedload(dbm.Post.rel_Like),
                                             sqlorm.joinedload(dbm.Post.rel_Comment),
                                             sqlorm.joinedload(dbm.Post.rel_Rating)).get(id)
      
      json_data = {}
      json_data['post'] = postschema.dump(post)
      json_data['vehicleinfo'] = vehicleschema.dump(post.rel_VehicleInfo)
      Session.commit()
      return jsonify({"msg": "Completed", "error": "", "info": json_data})
      
   except Exception as e:
      Session.rollback()
      return jsonify({"msg": "Incompleted", "error": str(e), "info": ""})
   
   