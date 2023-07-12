from flask import Flask, Blueprint, request, jsonify
import sqlalchemy.orm as sqlorm
from flask_jwt_extended import jwt_required, get_jwt_identity
from components.dbsettings import new_Scoped_session
from components import dbmodels as dbm, dbschemas as dbs

bpstatistics = Blueprint("bpstatistics", __name__)


@bpstatistics.route("/post/stat/<int:id>", methods=["GET"])
@jwt_required()
def getpostdetail(id):
   current_user = get_jwt_identity()
   if current_user is None:
      return jsonify({"msg": "Incompleted", "error": "Invalid token", "info": ""})
   
   schema_post = dbs.PostSchema()
   schema_poststat = dbs.PostStatSchema()
   schema_poststatus = dbs.PostStatusSchema()
   Session = new_Scoped_session()
   try:
      acc = Session.query(dbm.Account).get(current_user['ID'])
      if acc == None:
         Session.close()
         return jsonify({"msg": "Incompleted", "error": "Account not found", "info": ""})
      
      post = Session.query(dbm.Post).options(sqlorm.joinedload(dbm.Post.rel_PostStat)).get(id)
      if post.ID_Account != acc.ID:
         return jsonify({"msg": "Incompleted", "error": "You cannot see statistics of other user's post", "info": ""})
      
      statuses = Session.query(dbm.PostStatus).filter(dbm.PostStatus.ID_Post == id).order_by(dbm.PostStatus.ID.desc()).all()
      
      json_data = {}
      json_data['post'] = schema_post.dump(post)
      json_data['poststat'] = schema_poststat.dump(post.rel_PostStat)
      
      json_statuses = {}
      for i, item in enumerate(statuses): 
         json_statuses[i] = schema_poststatus.dump(item)
      json_data['poststatus'] = json_statuses
      
      Session.close()
      return jsonify({"msg": "Completed", "error": "", "info": json_data})
      
   except Exception as e:
      Session.rollback()
      return jsonify({"msg": "Incompleted", "error": str(e), "info": ""})