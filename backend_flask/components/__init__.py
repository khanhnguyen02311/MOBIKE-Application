from flask import Flask, jsonify
from flask_jwt_extended import JWTManager
from flask_debugtoolbar import DebugToolbarExtension
from .blueprints.utilities import logo, vehicle
from .blueprints.testing import gets, admin, test, image
from .blueprints.authentication import signup, signin, signout
from .blueprints.personal import account, post
from .config import FlaskConfig as fcfg
from .security import oauth, blocklistJWT

def create_app():
    App = Flask(__name__)
    App.config.from_object(fcfg)
    jwt = JWTManager(App)
    oauth.init_app(App)

    # @App.after_request
    # def after_request_callback(response):
    #     Session.remove()
    
    try:
        DebugToolbarExtension(App)
    except Exception as e:
        print(e)
        pass
    
    @App.route("/")
    def hello():
        return "<h1>Test running state.</h1>"
    
    
    # Callback function to check if a JWT exists in the redis blocklist
    @jwt.token_in_blocklist_loader
    def check_if_token_is_revoked(jwt_header, jwt_payload: dict):
        jti = jwt_payload["jti"]
        token_in_redis = blocklistJWT.get(jti)
        return token_in_redis is not None
    
    # SWAGGER_URL = '/api/docs'
    # API_URL = '/static/swagger.json'

    # # Call factory function to create our blueprint
    # swaggerui_blueprint = get_swaggerui_blueprint(
    #     SWAGGER_URL,  # Swagger UI static files will be mapped to '{SWAGGER_URL}/dist/'
    #     API_URL,
    #     config={  # Swagger UI config overrides
    #         'app_name': "MOBIKE_Application"
    #     },
    #     # oauth_config={  # OAuth config. See https://github.com/swagger-api/swagger-ui#oauth2-configuration .
    #     #    'clientId': "your-client-id",
    #     #    'clientSecret': "your-client-secret-if-required",
    #     #    'realm': "your-realms",
    #     #    'appName': "your-app-name",
    #     #    'scopeSeparator': " ",
    #     #    'additionalQueryStringParams': {'test': "hello"}
    #     # }
    # )
    
    # App.register_blueprint(swaggerui_blueprint)

    App.register_blueprint(test.bptest, url_prefix='/test')
    App.register_blueprint(image.bpimage, url_prefix='/image')
    App.register_blueprint(gets.bpget, url_prefix='/gets')
    App.register_blueprint(admin.bpadmin, url_prefix='/admin')
    
    App.register_blueprint(signup.bpsignup, url_prefix='/auth')
    App.register_blueprint(signin.bpsignin, url_prefix='/auth')
    App.register_blueprint(signout.bpsignout, url_prefix='/auth')
    
    App.register_blueprint(account.bpaccount, url_prefix='/personal')
    App.register_blueprint(post.bppost, url_prefix='/personal')
    
    App.register_blueprint(vehicle.bpvehicle, url_prefix='/utilities')
    App.register_blueprint(logo.bplogo, url_prefix='/utilities')
    
    return App