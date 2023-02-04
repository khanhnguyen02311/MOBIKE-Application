from flask import Flask, Blueprint, request, jsonify
import sqlalchemy.orm as sqlorm
from flask_jwt_extended import jwt_required, get_jwt_identity
from components.dbsettings import new_Scoped_session
from components import dbmodels as dbm, dbschemas as dbs

bppostsearch = Blueprint("bppostsearch", __name__)


# @bppostsearch.route("/post/all", methods=["POST"])
# def searchposts():
#    arg_searchstr = request.args.get('string', default = "", type = str)
#    arg_page = request.args.get('page', default = 1, type = int)
#    arg_numperpage = request.args.get('numperpage', default = 20, type = int)
#    arg_sortby = request.args.get('sortby', default = "", type = str)
#    arg_order = request.args.get('order', default = "asc", type = str)
#    arg_pricestart = request.args.get('pricestart', default = -1, type = int)
#    arg_priceend = request.args.get('priceend', default = -1, type = int)
#    arg_type = request.args.get('type', default = -1, type = int)
#    arg_brand = request.args.get('brand', default = -1, type = int)
#    arg_lineup = request.args.get('lineup', default = -1, type = int)
#    arg_color = request.args.get('color', default = -1, type = int)
#    arg_mnfyear = request.args.get('mnfyear', default = -1, type = int)
   
#    Session = new_Scoped_session()
#    try:
      
#       if arg_sortby == "rating": query_orderby = dbm.Post.rel_Rating
#       elif arg_sortby == "like": query_orderby = dbm.Post.rel_Like
#       else: query_orderby = dbm.Post.ID
      
#       query_orderby = query_orderby.asc() if arg_order == "asc" else query_orderby.desc()
      
#       posts = Session.query(dbm.Post
#          ).join(dbm.Post.rel_VehicleInfo
#          ).filter(arg_type == -1 or dbm.VehicleInfo.ID_VehicleType == arg_type, 
#                   arg_brand == -1 or dbm.VehicleInfo.ID_VehicleBrand == arg_brand, 
#                   arg_lineup == -1 or dbm.VehicleInfo.ID_VehicleLineup == arg_lineup, 
#                   arg_color == -1 or dbm.VehicleInfo.ID_Color == arg_color,
#                   arg_mnfyear == -1 or dbm.VehicleInfo.Manufacture_year == arg_mnfyear)
                                             
#       Session.commit()
#       return jsonify({"msg": "Completed", "error": "", "info": posts})
      
#    except Exception as e:
#       Session.rollback()
#       return jsonify({"msg": "Incompleted", "error": str(e), "info": ""})


@bppostsearch.route("/post/<id>", methods=["GET"])
def getdetailpost(id):
   postschema = dbs.PostSchema()
   vehicleschema = dbs.VehicleInfoSchema()
   Session = new_Scoped_session()
   try:
      status = Session.query(dbm.PostStatus).filter(dbm.PostStatus.ID_Post == id).order_by(dbm.PostStatus.ID.desc()).first()
      if status == None or status.Status != 1:
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
   
   
@bppostsearch.route("/post/<id>/ratings", methods=["GET"])
def getpostratings(id):
   schema = dbs.AccountInfoSchemaShort()
   Session = new_Scoped_session()
   try:
      status = Session.query(dbm.PostStatus).filter(dbm.PostStatus.ID_Post == id).order_by(dbm.PostStatus.ID.desc()).first()
      if status.Status != 1:
         return jsonify({"msg": "Completed", "error": "Post not found", "info": ""})
      
      ratings = Session.query(dbm.Rating
         ).options(sqlorm.joinedload(dbm.Rating.rel_Account).subqueryload(dbm.Account.rel_AccountInfo)
         ).filter(dbm.Rating.ID_Post == id
         ).all()
      json_ratings = {}
      
      for index, item in enumerate(ratings):
         temp = {}
         temp['accountinfo'] = schema.dump(item.rel_Account.rel_AccountInfo)
         temp['account'] = item.ID_Account
         temp['rating'] = item.Rating
         json_ratings[index] = temp
      
      Session.commit()
      return jsonify({"msg": "Completed", "error": "", "info": json_ratings})
      
   except Exception as e:
      Session.rollback()
      return jsonify({"msg": "Incompleted", "error": str(e), "info": ""})
   