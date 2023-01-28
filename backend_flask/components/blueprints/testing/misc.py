from flask import Blueprint, request, jsonify, render_template

bpmisc = Blueprint('bpmisc', __name__)

@bpmisc.route('/')
def hello():
    return "<h1>Hello from misc.</h1>"

print("misc.py loaded.")