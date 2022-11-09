from flask import Flask
from flask_jwt_extended import JWTManager

# from .blueprints.post import bppost
from .blueprints.auth import bpauth
# from .blueprints.image import bpimage
# from .blueprints.gets import bpget
# from .blueprints.admin import bpadmin

from .config import FlaskConfig as cfg

def create_app():
    App = Flask(__name__)
    App.config.from_object(cfg)

    jwt = JWTManager(App)
    
    @App.route("/")
    def hello():
        return "<h1>Hello from server!</h1>"
    
    # App.register_blueprint(bppost, url_prefix='/posts')
    App.register_blueprint(bpauth, url_prefix='/auth')
    # App.register_blueprint(bpimage, url_prefix='/image')
    # App.register_blueprint(bpget, url_prefix='/gets')
    # App.register_blueprint(bpadmin, url_prefix='/admin')
    
    return App

# @App.teardown_appcontext
# def cleanup(resp_or_exc):
#     Session.remove()