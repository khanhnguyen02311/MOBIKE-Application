from flask import Flask
from flask_jwt_extended import JWTManager

from .blueprints.testing import post, image, gets, admin
from .blueprints.authentication import signup, signin

from .config import FlaskConfig as fcfg
from .security import oauth


def create_app():
    App = Flask(__name__)
    App.config.from_object(fcfg)
    jwt = JWTManager(App)
    oauth.init_app(App)
    
    @App.route("/")
    def hello():
        return "<h1>Test running state.</h1>"

    App.register_blueprint(post.bppost, url_prefix='/posts')
    App.register_blueprint(image.bpimage, url_prefix='/image')
    App.register_blueprint(gets.bpget, url_prefix='/gets')
    App.register_blueprint(admin.bpadmin, url_prefix='/admin')
    
    App.register_blueprint(signup.bpsignup, url_prefix='/auth')
    App.register_blueprint(signin.bpsignin, url_prefix='/auth')
    
    return App

# @App.teardown_appcontext
# def cleanup(resp_or_exc):
#     Session.remove()