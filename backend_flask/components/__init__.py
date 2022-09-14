from flask import Flask
from flask_jwt_extended import JWTManager
from .dbmodels import db
from .schemas import ma

def create_app():
    app = Flask(__name__)
    
    app.config['SECRET_KEY'] = 'app_secretkeypos_ayd4105fvy8w8sacz'
    app.config['JWT_SECRET_KEY'] = 'jwt_secretkeypos_ayd4105fvy8w8sacz'
    app.config['SQLALCHEMY_DATABASE_URI'] = "mysql://mysqluser1:user1pwd@localhost/workingdatabase1?unix_socket=/var/run/mysqld/mysqld.sock"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    jwt = JWTManager(app)
    db.init_app(app)
    ma.init_app(app)
    
    from .views import bpviews
    from .auth import bpauth
    app.register_blueprint(bpviews, url_prefix='')
    app.register_blueprint(bpauth, url_prefix='/auth')
    
    return app

