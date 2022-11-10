from enum import Enum
from flask import Blueprint, request, jsonify
from ..dbmodels import *
from ..dbschemas import *
from ..dbsettings import Session
from ..inserter import *
from ..dbschemas import *

bppost = Blueprint('bppost', __name__)

@bppost.route('/get', methods = ['GET'])
def get_articles():
    return "Hello"

class DataColumn(Enum):
    Email = 1,
    Username = 3,