import json
from flask import Flask, Blueprint, request, jsonify
import flask_jwt_extended as jwte

bpauth = Blueprint('bpauth', __name__)


# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@bpauth.route('/login', methods = ['POST'])
def login():
   username = request.json['username']
   password = request.json['password']
   if username != 'test' or password != 'test':
      return jsonify({"msg": "Wrong user"}), 401
   token = jwte.create_access_token(identity=username)
   return jsonify(access_tokem=token)


# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@bpauth.route('/protected', methods = ['GET'])
@jwte.jwt_required()
def protected():
   # Access the identity of the current user with get_jwt_identity
   current_user = jwte.get_jwt_identity()
   if current_user == None:
      return jsonify({"protected": "None"})
   return jsonify(logged_in_as=current_user), 200
