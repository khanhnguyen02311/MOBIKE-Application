from flask import Flask, Blueprint, request, jsonify
import sqlalchemy.orm as sqlorm
from sqlalchemy import func
from flask_jwt_extended import jwt_required, get_jwt_identity
from components.dbsettings import new_Scoped_session
from components import dbmodels as dbm, dbschemas as dbs

bppostsearch = Blueprint("bppostsearch", __name__)


@bppostsearch.route("/post/all", methods=["GET"])
def searchposts():
   arg_searchstr = request.args.get('string', default = "", type = str)
   arg_page = request.args.get('page', default = 1, type = int)
   arg_numperpage = request.args.get('numperpage', default = 30, type = int)
   # arg_sortby = request.args.get('sortby', default = "", type = str)
   arg_ordertype = request.args.get('ordertype', default = "time", type = str)
   arg_order = request.args.get('order', default = "asc", type = str)
   arg_pricestart = request.args.get('pricestart', default = -1, type = int)
   arg_priceend = request.args.get('priceend', default = -1, type = int)
   arg_type = request.args.get('type', default = -1, type = int)
   arg_brand = request.args.get('brand', default = -1, type = int)
   arg_lineup = request.args.get('lineup', default = -1, type = int)
   arg_color = request.args.get('color', default = -1, type = int)
   arg_mnfyear = request.args.get('mnfyear', default = -1, type = int)
   arg_condition = request.args.get('condition', default = -1, type = int)
   
   schema = dbs.PostSchemaShort()
   Session = new_Scoped_session()
   try:
      # if arg_sortby == "rating": query_orderby = dbm.Post.rel_Rating
      # elif arg_sortby == "like": query_orderby = dbm.Post.rel_Like
      
      query_orderby = dbm.Post.ID if arg_ordertype == "time" else dbm.Post.Pricetag
      query_orderby = query_orderby.asc() if arg_order == "asc" else query_orderby.desc()
      
      posts = Session.query(dbm.Post
         ).join(dbm.Post.rel_VehicleInfo
         ).filter(arg_type == -1 or dbm.VehicleInfo.ID_VehicleType == arg_type, 
                  arg_brand == -1 or dbm.VehicleInfo.ID_VehicleBrand == arg_brand, 
                  arg_lineup == -1 or dbm.VehicleInfo.ID_VehicleLineup == arg_lineup, 
                  arg_color == -1 or dbm.VehicleInfo.ID_Color == arg_color,
                  arg_mnfyear == -1 or dbm.VehicleInfo.Manufacture_year == arg_mnfyear,
                  func.lower(dbm.Post.Title).contains(func.lower(arg_searchstr)),
                  arg_pricestart == -1 or dbm.Post.Pricetag >= arg_pricestart,
                  arg_priceend == -1 or dbm.Post.Pricetag <= arg_priceend,
                  arg_condition == -1 or dbm.VehicleInfo.ID_Condition == arg_condition
         ).order_by(query_orderby).all()
      post_list = []
      for i in posts:
         status = Session.query(dbm.PostStatus).filter(dbm.PostStatus.ID_Post == i.ID).order_by(dbm.PostStatus.ID.desc()).first()
         if status.Status == 1: post_list.append(schema.dump(i))
      Session.commit()
      return jsonify({"msg": "Completed", "error": "", "info": post_list[(arg_page - 1) * arg_numperpage : arg_page * arg_numperpage]})
      
   except Exception as e:
      Session.rollback()
      return jsonify({"msg": "Incompleted", "error": str(e), "info": ""})


@bppostsearch.route("/post/<int:id>", methods=["GET"])
def getdetailpost(id):
   postschema = dbs.PostSchema()
   vehicleschema = dbs.VehicleInfoSchema()
   userschema = dbs.AccountInfoSchemaPublic()
   addressschema = dbs.AddressSchemaShort()
   Session = new_Scoped_session()
   try:
      status = Session.query(dbm.PostStatus).filter(dbm.PostStatus.ID_Post == id).order_by(dbm.PostStatus.ID.desc()).first()
      if status == None or status.Status != 1:
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
      Session.commit()
      return jsonify({"msg": "Completed", "error": "", "info": json_data})
      
   except Exception as e:
      Session.rollback()
      return jsonify({"msg": "Incompleted", "error": str(e), "info": ""})
   
   
@bppostsearch.route("/post/<id>/ratings", methods=["GET"])
def getpostratings(id):
   schema = dbs.AccountInfoSchemaPublic()
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
   
   
