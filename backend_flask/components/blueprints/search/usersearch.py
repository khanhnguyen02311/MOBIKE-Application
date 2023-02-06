from flask import Flask, Blueprint, request, jsonify
from sqlalchemy import func
import sqlalchemy.orm as sqlorm
from flask_jwt_extended import jwt_required, get_jwt_identity
from components.dbsettings import new_Scoped_session
from components import dbmodels as dbm, dbschemas as dbs

bpusersearch = Blueprint("bpusersearch", __name__)


@bpusersearch.route("/user/search", methods=["POST"])
def searchusers():
   arg_searchstr = request.args.get('string', default = "", type = str)
   userschema = dbs.AccountInfoSchemaPublic()
   Session = new_Scoped_session()
   try:
      accounts = Session.query(dbm.Account).options(sqlorm.joinedload(dbm.Account.rel_AccountInfo)
                        ).filter(func.lower(dbm.AccountInfo.Name).contains(func.lower(arg_searchstr)), dbm.Account.ID_Permission==2).all()
      acc_list = []
      for i in accounts:
         acc_list.append(userschema.dump(i)) 
      Session.commit()
      return jsonify({"msg": "Completed", "error": "", "info": acc_list})
      
   except Exception as e:
      Session.rollback()
      return jsonify({"msg": "Incompleted", "error": str(e), "info": ""})


@bpusersearch.route("/user/<id>", methods=["GET"])
def getdetailpost(id):
   userschema = dbs.AccountInfoSchemaPublic()
   Session = new_Scoped_session()
   try:
      acc = Session.query(dbm.Account).options(sqlorm.joinedload(dbm.Account.rel_AccountInfo)).get(id)
      if acc is None:
         Session.close()
         return jsonify({"msg": "Incompleted", "error": "Account not found", "info": ""})
      posts = Session.query(dbm.Post).options(sqlorm.joinedload(dbm.Post.rel_Image), 
                                              sqlorm.joinedload(dbm.Post.rel_VehicleInfo)
                     ).filter(dbm.Post.ID_Account == id)
      Session.commit()
      return jsonify({"msg": "Completed", "error": "", "info": userschema.dump(acc.rel_AccountInfo)})
      
   except Exception as e:
      Session.rollback()
      return jsonify({"msg": "Incompleted", "error": str(e), "info": ""})
   
