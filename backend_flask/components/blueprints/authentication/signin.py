import secrets, json
from flask import Flask, Blueprint, request, jsonify, url_for
import flask_jwt_extended as jwte
from components.dbsettings import new_Session
from components import dbmodels as dbm, dbschemas as dbs
from components.security import make_hash, check_hash, oauth

bpsignin = Blueprint('bpsignin', __name__)


@bpsignin.route('/signin', methods = ['POST'])
def signin():
   schema = dbs.AccountSchema()
   Session = new_Session()
   try:
      usernameOrEmail = request.json["username_or_email"]
      password = request.json["password"]
      
      acc = Session.query(dbm.Account).filter(dbm.Account.Email==usernameOrEmail, dbm.Account.Account_type==0).first() or \
            Session.query(dbm.Account).filter(dbm.Account.Username==usernameOrEmail, dbm.Account.Account_type==0).first()
         
      if (acc != None):
         result = check_hash(acc.Password, password)
         if (result[0]):
            if result[1]:
               Session.get(dbm.Account, acc.ID).update({"Password": make_hash(password)}, synchronize_session="fetch")
               Session.commit()
            access_token = jwte.create_access_token(identity=schema.dump(acc))
            Session.close()
            return jsonify({
               "message": "Completed", 
               "error": "", 
               "token": access_token}), 200
         else: 
            Session.close()
            return jsonify({
               "message": "Incompleted", 
               "error": "Wrong username or password", 
               "token": ""}), 401
         
      else:
         Session.close()
         return jsonify({
            "message": "Incompleted", 
            "error": "Wrong username or password", 
            "token": ""}), 401
      
   except Exception as e:
      Session.rollback()
      Session.close()
      return jsonify({
         "message": "Incompleted", 
         "error": str(e), 
         "token": "None"}), 409


@bpsignin.route('/signin/google/')
def googlesignup():
   redirect_uri = url_for('bpsignin.googleauthorize', _external=True)
   return oauth.google.authorize_redirect(redirect_uri)


@bpsignin.route('/signin/google/authorize')
def googleauthorize():
   schema = dbs.AccountSchema()
   Session = new_Session()
   try:
      token = oauth.google.authorize_access_token()
      profile = oauth.google.get('userinfo').json()
      
      # for AccountInfo later
      name = profile["name"]
      picture_location = profile["picture"]
      
      email = profile["email"]
      username = "accounts.google.com" + profile["id"]
      
      acc = Session.query(dbm.Account).filter(dbm.Account.Username==username, dbm.Account.Account_type==1).first()
      if acc is not None:
         access_token = jwte.create_access_token(identity=schema.dump(acc))
         Session.close()
         return jsonify({
            "message": "Completed", 
            "error": "", 
            "token": access_token})
      
      password = make_hash(secrets.token_urlsafe(64))
      
      new_Account = dbm.Account(Email=email, Username=username, Password=password, Account_type=1, ID_Permission=4)
      access_token = jwte.create_access_token(identity=schema.dump(new_Account))
      Session.add(new_Account)
      Session.commit()
      Session.close()
      return jsonify({
         "message": "Completed", 
         "error": "", 
         "token": access_token})
      
   except Exception as e:
      Session.rollback()
      Session.close()
      return jsonify({
         "message": "Incompleted", 
         "error": str(e), 
         "token": ""})
    
