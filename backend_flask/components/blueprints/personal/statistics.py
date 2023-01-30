from flask import Flask, Blueprint, request, jsonify
import sqlalchemy.orm as sqlorm
from flask_jwt_extended import jwt_required, get_jwt_identity
from components.dbsettings import new_Scoped_session
from components import dbmodels as dbm, dbschemas as dbs

bpstatistics = Blueprint("bpstatistics", __name__)


# @bpstatistics.route("/post/<int:id>", methods=["GET"])
# @jwt_required()
# def getpostdetail(id):
#    current_user = get_jwt_identity()
#    if current_user is None:
#       return jsonify({"msg": "Incompleted", "error": "Invalid token", "info": ""})
   
#    schema = dbs.PostSchema()
#    Session = new_Scoped_session()
#    try:
#       acc = Session.query(dbm.Account).get(current_user['ID'])
#       if acc == None:
#          Session.close()
#          return jsonify({"msg": "Incompleted", "error": "Account not found", "info": ""})
      
#       post = Session.query(dbm.Post).options(sqlorm.joinedload(dbm.Post.rel_ChatRoom),
#                                              sqlorm.joinedload(dbm.Post.rel_PostStat),
#                                              sqlorm.joinedload(dbm.Post.rel_Like),
#                                              sqlorm.joinedload(dbm.Post.rel_Comment),
#                                              sqlorm.joinedload(dbm.Post.rel_Rating)).get(id)
      
#       if post.ID_Account != acc.ID:
#          return jsonify({"msg": "Incompleted", "error": "You cannot see statistics of other people's post", "info": ""})
      
#       json_data = {}
#       #data['post']
#       Session.close()
#       return jsonify({"msg": "Completed", "error": "", "info": json_data})
      
#    except Exception as e:
#       Session.rollback()
#       return jsonify({"msg": "Incompleted", "error": str(e), "info": ""})