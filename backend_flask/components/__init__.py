from datetime import datetime, timezone, timedelta
from flask import Flask, jsonify
from flask_jwt_extended import JWTManager, get_jwt, get_jwt_identity, create_access_token

from .blueprints.testing import post, image, gets, admin
from .blueprints.authentication import signup, signin, signout
from .blueprints.personal import account

from .config import FlaskConfig as fcfg
from .security import oauth, blocklistJWT


def create_app():
    App = Flask(__name__)
    App.config.from_object(fcfg)
    jwt = JWTManager(App)
    oauth.init_app(App)
    
    @App.route("/")
    def hello():
        return "<h1>Test running state.</h1>"
    
    # Callback function to check if a JWT exists in the redis blocklist
    @jwt.token_in_blocklist_loader
    def check_if_token_is_revoked(jwt_header, jwt_payload: dict):
        jti = jwt_payload["jti"]
        token_in_redis = blocklistJWT.get(jti)
        return token_in_redis is not None


    App.register_blueprint(post.bppost, url_prefix='/posts')
    App.register_blueprint(image.bpimage, url_prefix='/image')
    App.register_blueprint(gets.bpget, url_prefix='/gets')
    App.register_blueprint(admin.bpadmin, url_prefix='/admin')
    
    App.register_blueprint(signup.bpsignup, url_prefix='/auth')
    App.register_blueprint(signin.bpsignin, url_prefix='/auth')
    App.register_blueprint(signout.bpsignout, url_prefix='/auth')
    
    App.register_blueprint(account.bpaccount, url_prefix='/personal')
    
    return App