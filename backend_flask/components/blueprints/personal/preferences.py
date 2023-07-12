from datetime import datetime, timezone
from flask import Flask, Blueprint, request, jsonify
import sqlalchemy.orm as sqlorm
from flask_jwt_extended import jwt_required, get_jwt_identity
from components.dbsettings import new_Scoped_session
from components import dbmodels as dbm, dbschemas as dbs

bppreferences = Blueprint("bppreferences", __name__)


@bppreferences.route("/<string:preftype>/edit", methods=['POST'])
@jwt_required()
def editpreferences(preftype):
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
      
      post = Session.query(dbm.Post).options(sqlorm.joinedload(dbm.Post.rel_PostStat)).get(info['post'])
      
      if preftype == "like":
         existed_likes = Session.query(dbm.Like).filter(dbm.Like.ID_Account == current_user['ID'],
                                                        dbm.Like.ID_Post == info['post']).all()
         
         if len(existed_likes) == 0:
            post.rel_PostStat.Like_amount += 1
            new_like = dbm.Like(
               ID_Account=current_user["ID"],
               ID_Post=info['post'],
            )
            Session.add(new_like)
            Session.commit()
            return jsonify({"msg": "Completed", "error": "", "info": "Like added"})
         else:
            post.rel_PostStat.Like_amount -= len(existed_likes)
            for item in existed_likes: 
               Session.delete(item)
            Session.commit()
            return jsonify({"msg": "Completed", "error": "", "info": "Like removed"})
      
      elif preftype == "view":
         existed_views = Session.query(dbm.View).filter(dbm.View.ID_Account == current_user['ID'],
                                                        dbm.View.ID_Post == info['post']).all()
         msg = "View added"
         if len(existed_views) == 0:
            post.rel_PostStat.View_amount += 1
            new_view = dbm.View(
               ID_Account=current_user["ID"],
               ID_Post=info['post'],
            )
            Session.add(new_view)
         else: msg = "View already added"
            
         Session.commit()
         return jsonify({"msg": "Completed", "error": "", "info": msg})

      
      elif preftype == "contact":
         existed_contacts = Session.query(dbm.Contact).filter(dbm.Contact.ID_Account == current_user['ID'],
                                                              dbm.Contact.ID_Post == info['post']).all()
         print(existed_contacts)
         msg = "Contact added"
         if len(existed_contacts) == 0:
            post.rel_PostStat.Contact_amount += 1
            new_contact = dbm.Contact(
               ID_Account=current_user["ID"],
               ID_Post=info['post'],
            )
            Session.add(new_contact)
         else: msg = "Contact already added"
         
         Session.commit()
         return jsonify({"msg": "Completed", "error": "", "info": msg})
      
      else: 
         Session.close()
         return jsonify({"msg": "Incompleted", "error": "Invalid type", "info": ""})
   
   except Exception as e:
      Session.rollback()
      return jsonify({"msg": "Incompleted", "error": str(e), "info": ""})
   
   
   
@bppreferences.route("/rating/edit", methods=['POST'])
@jwt_required()
def editrating():
   current_user = get_jwt_identity()   
   if current_user is None:
      return jsonify({"msg": "Incompleted", "error": "Invalid token", "info": ""})
   
   ratingschema = dbs.RatingSchema()
   info = request.get_json()
   Session = new_Scoped_session()
   try:
      acc = Session.query(dbm.Account).get(current_user['ID'])
      if acc == None:
         Session.close()
         return jsonify({"msg": "Incompleted", "error": "Account not found", "info": ""})

      existed_rating = Session.query(dbm.Rating).filter(dbm.Rating.ID_Account == current_user['ID'],
                                                        dbm.Rating.ID_Post == info['post']).first()
      if existed_rating == None:
         existed_contact = Session.query(dbm.Contact).filter(dbm.Contact.ID_Account == current_user['ID'],
                                                             dbm.Contact.ID_Post == info['post']).first()
         if existed_contact == None: 
            Session.close()
            return jsonify({"msg": "Incompleted", "error": "Not enough conditions", "info": ""})
         
         new_rating = dbm.Rating(
            ID_Account = current_user['ID'],
            Rating_point = info['rating'],
            Content = info['content'],
            ID_Post = info['post']
         )
         Session.add(new_rating)
         post = Session.query(dbm.Post).options(sqlorm.joinedload(dbm.Post.rel_PostStat)).get(info['post'])
         post.rel_PostStat.Rating_amount += 1
         Session.commit()
         return jsonify({"msg": "Completed", "error": "", "info": {"type": "add", "rating": ratingschema.dump(new_rating)}})
      
      else:
         existed_rating.Rating_point = info['rating']
         existed_rating.Content = info['content']
         existed_rating.Time_created = datetime.now(timezone.utc)
         Session.commit()
         return jsonify({"msg": "Completed", "error": "", "info": {"type": "edit", "rating": ratingschema.dump(existed_rating)}})
      
   except Exception as e:
      Session.rollback()
      return jsonify({"msg": "Incompleted", "error": str(e), "info": ""})
   

@bppreferences.route("/rating/del", methods=['DEL'])
@jwt_required()
def delrating():
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

      existed_rating = Session.query(dbm.Rating).filter(dbm.Rating.ID_Account == current_user['ID'],
                                                        dbm.Rating.ID_Post == info['post']).first()
      if existed_rating == None:
         return jsonify({"msg": "Incompleted", "error": "", "info": "Rating not found"})
      else:
         Session.delete(existed_rating)
         Session.commit()
         return jsonify({"msg": "Completed", "error": "", "info": "Rating deleted"})
      
   except Exception as e:
      Session.rollback()
      return jsonify({"msg": "Incompleted", "error": str(e), "info": ""})