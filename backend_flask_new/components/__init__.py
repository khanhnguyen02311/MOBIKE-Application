from flask import Flask
from flask_jwt_extended import JWTManager

from .config import FlaskConfig as cfg 
from .dbsettings import Session
from components import dbmodels as dbm
from .blueprints.post import bppost
from .blueprints.auth import bpauth

App = Flask(__name__)
App.config.from_object(cfg)

jwt = JWTManager(App)

App.register_blueprint(bppost, url_prefix='/posts')
App.register_blueprint(bpauth, url_prefix='/auth')

@App.teardown_appcontext
def cleanup(resp_or_exc):
    Session.remove()