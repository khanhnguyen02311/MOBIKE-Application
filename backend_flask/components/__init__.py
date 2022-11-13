from flask import Flask
from flask_jwt_extended import JWTManager

from .config import FlaskConfig as cfg


def create_app():
    App = Flask(__name__)
    App.config.from_object(cfg)

    jwt = JWTManager(App)
    
    @App.route("/")
    def hello():
        return "<h1>ABC!</h1>"
    
    return App

# @App.teardown_appcontext
# def cleanup(resp_or_exc):
#     Session.remove()