from flask import Flask
from flask_jwt_extended import JWTManager

from .config import AppConfig 
from .dbmodels import db
from .schemas import ma

def create_app():
    app = Flask(__name__)
    
    app.config.from_object(AppConfig)
    
    jwt = JWTManager(app)
    db.init_app(app)
    ma.init_app(app)
    
    from .views import bpviews
    from .auth import bpauth
    app.register_blueprint(bpviews, url_prefix='')
    app.register_blueprint(bpauth, url_prefix='/auth')
    
    return app