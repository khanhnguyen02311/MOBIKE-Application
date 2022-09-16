from flask import Blueprint, request, jsonify

bppost = Blueprint('bppost', __name__)

@bppost.route('/get', methods = ['GET'])
def get_articles():
    pass
