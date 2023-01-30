import os
from flask import Flask, Blueprint, jsonify, request, send_file
import flask_jwt_extended as jwte
from components.dbsettings import new_Scoped_session
from components import dbmodels as dbm, dbschemas as dbs
from ...config import STORAGE_PATH

bpappadmin = Blueprint('bpappadmin', __name__)
    

@bpappadmin.route('/status/post/get', methods = ['GET'])
def getpoststatus(id):
   pass
