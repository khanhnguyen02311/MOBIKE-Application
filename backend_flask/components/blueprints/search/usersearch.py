from flask import Flask, Blueprint, request, jsonify
from sqlalchemy import func
import sqlalchemy.orm as sqlorm
from flask_jwt_extended import jwt_required, get_jwt_identity
from components.dbsettings import new_Scoped_session
from components import dbmodels as dbm, dbschemas as dbs

bpusersearch = Blueprint("bpusersearch", __name__)


@bpusersearch.route("/user/all", methods=["GET"])
def searchusers():
   arg_searchstr = request.args.get('string', default = "", type = str)
   userschema = dbs.AccountInfoSchemaPublic()
   accschema = dbs.AccountSchema()
   Session = new_Scoped_session()
   try:
      accounts = Session.query(dbm.Account).filter(dbm.Account.ID_Permission==4).join(dbm.Account.rel_AccountInfo).filter(func.lower(dbm.AccountInfo.Name).contains(func.lower(arg_searchstr))).all()
      acc_list = []
      for i in accounts:
         temp = {}
         temp['account'] = accschema.dump(i)
         temp['accountinfo'] = userschema.dump(i.rel_AccountInfo)
         acc_list.append(temp)
      Session.commit()
      return jsonify({"msg": "Completed", "error": "", "info": acc_list})
      
   except Exception as e:
      Session.rollback()
      return jsonify({"msg": "Incompleted", "error": str(e), "info": ""})


@bpusersearch.route("/user/<int:id>", methods=["GET"])
def getdetailpost(id):
   userschema = dbs.AccountInfoSchemaPublic()
   accschema = dbs.AccountSchema()
   postschema = dbs.PostSchemaShort()
   Session = new_Scoped_session()
   try:
      acc = Session.query(dbm.Account).options(sqlorm.joinedload(dbm.Account.rel_AccountInfo)).get(id)
      if acc is None:
         Session.close()
         return jsonify({"msg": "Incompleted", "error": "Account not found", "info": ""})
      posts = Session.query(dbm.Post).options(sqlorm.joinedload(dbm.Post.rel_Image)).filter(dbm.Post.ID_Account == id).all()
      
      for i, item in enumerate(posts):
         status = Session.query(dbm.PostStatus).filter(dbm.PostStatus.ID_Post == item.ID).order_by(dbm.PostStatus.ID.desc()).first()
         if status == None or status.Status != 1: posts.pop(i)
      
      json_detail = {}
      json_detail['account'] = accschema.dump(acc)
      json_detail['accountinfo'] = userschema.dump(acc.rel_AccountInfo)
      list_post = []
      for i in posts:
         list_post.append(postschema.dump(i))
      json_detail['posts'] = list_post
      Session.commit()
      return jsonify({"msg": "Completed", "error": "", "info": json_detail})
      
   except Exception as e:
      Session.rollback()
      return jsonify({"msg": "Incompleted", "error": str(e), "info": ""})
   
