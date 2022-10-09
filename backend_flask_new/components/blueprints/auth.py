from flask import Flask, Blueprint, request, jsonify
import flask_jwt_extended as jwte
from components.dbsettings import Session
from components import dbmodels as dbm, dbschemas as dbs
import argon2, os
from components.config import SQLAlchemyConfig as cfg

bpauth = Blueprint('bpauth', __name__)

ph = argon2.PasswordHasher(time_cost=4, hash_len=64, salt_len=32, type=argon2.Type.D)

# hashing function
def make_hash(psw):
   SALT = os.getenv('HASHSALT')
   psw += SALT
   hash = ph.hash(psw)
   return hash.encode('utf-8')

def check_hash(old_hash, psw):
   SALT = os.getenv('HASHSALT')
   psw += SALT
   try:
      ph.verify(old_hash, psw)
      if (ph.check_needs_rehash(old_hash)): 
         return [True, True]
      else: 
         return [True, False]
   except:
      return [False]
   
   
@bpauth.route('/testpass', methods=['GET'])
def testhash():
   text = request.json['text']
   hash = make_hash(text)
   return hash


# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@bpauth.route('/protected', methods = ['GET'])
@bpauth.route('/me', methods = ['GET'])
@jwte.jwt_required()
def protected():
   # Access the identity of the current user with get_jwt_identity
   current_user = jwte.get_jwt_identity()
   #return jsonify(logged_in_as=current_user), 200 # ok
   return jsonify(current_user), 200 # ok


# @bpauth.route('/all', methods=['GET'])
# def getAccounts():
#    listacc = Session.query(dbm.Account).all()
#    schemas = dbs.AccountSchema(many=True)
#    return jsonify(schemas.dump(listacc))


# @bpauth.route('/permission/all', methods=['GET'])
# def getPermissions():
#    listperm = Session.query(dbm.Permission).all()
#    schemas = dbs.PermissionSchema(many=True)
#    return jsonify(schemas.dump(listperm))


# @bpauth.route('/permission/add', methods=['POST'])
# def addPermission():
#    schema = dbs.PermissionSchema()
#    try:
#       name = request.json['name']
#       new_perm = dbm.Permission(Name=name)
#       Session.add(new_perm)
#       Session.commit()
#       return jsonify(schema.dump(new_perm)), 201 # created
   
#    except Exception as e:
#       Session.rollback()
#       return jsonify({"Error": str(e), "Status": "Incompleted"}), 409 # conflict
   

@bpauth.route('/signup', methods=['POST'])
def signup():
   schema = dbs.AccountSchema()
   try:
      email = request.json['email']
      permission = int(request.json['permission'])
      username = request.json['username']
      password = make_hash(request.json['password'])
      
      existedEmail = Session.query(dbm.Account).filter(dbm.Account.Email == email).first()
      existedUsername = Session.query(dbm.Account).filter(dbm.Account.Username == username).first()

      if (not existedEmail is None):
         return jsonify({"Error": "Email existed", "Status": "Incompleted"}), 409
      elif (not existedUsername is None):
         return jsonify({"Error": "Username existed", "Status": "Incompleted"}), 409

      new_account = dbm.Account(Username=username, Password=password, Email=email, ID_Permission=permission)
      Session.add(new_account)
      Session.commit()
      return jsonify(schema.dump(new_account)), 201
   
   except Exception as e:
      Session.rollback()
      return jsonify({"Error": str(e), "Status": "Incompleted"}), 409


# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@bpauth.route('/signin', methods = ['POST'])
def signin():
   # username = request.json["username"]
   # password = request.json["password"]
   # if username != 'test' or password != 'test':
   #    return jsonify({"msg": "Wrong user"}), 401 # unauthorized
   # token = jwte.create_access_token(identity=username)
   # return jsonify(access_token=token)
   schema = dbs.AccountSchema()
   try:

      userNameOrEmail = request.json["username_or_email"]
      password = request.json["password"]
      acc = Session.query(dbm.Account).filter(dbm.Account.Email==userNameOrEmail).first()
      if (acc is None):
         acc = Session.query(dbm.Account).filter(dbm.Account.Username==userNameOrEmail).first()
         
      if (acc != None):
         
         result = check_hash(acc.Password, password)
         if (result[0]):
            if result[1]:
               Session.get(dbm.Account, acc.ID).update({"Password": make_hash(password)}, synchronize_session="fetch")
               Session.commit()
            token = jwte.create_access_token(identity=schema.dump(acc),expires_delta=False)
            print('\n\n\nUser {} has just signed in'.format(acc.Username))
            return jsonify({"msg": "Successful", "token": token, "uid": acc.ID}), 200
         else: 
            # return jsonify({acc.Password: "a", "msg": "Wrong password"}), 401
            return jsonify({"msg": "Wrong password"}), 401
      else:
         return jsonify({"msg": "Account not exists"}), 401
   except Exception as e:
      Session.rollback()
      return jsonify({"Error": str(e), "Status": "Incompleted"}), 409