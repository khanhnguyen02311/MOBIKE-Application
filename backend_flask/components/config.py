from dotenv import load_dotenv
from os import environ
from argon2 import Type as ArgonType

HOME_DIRECTORY = '/var/lib/jenkins/workspace/mobike-testbranch/backend_flask/'
load_dotenv(dotenv_path=HOME_DIRECTORY + '.env')

DB_USERNAME = environ.get('DBUSERNAME')
DB_PASSWORD = environ.get('DBPASSWORD')
DB_NAME = environ.get('DBNAME')

class FlaskConfig:
   SECRET_KEY = environ.get('SECRET_KEY')
   JWT_SECRET_KEY = environ.get('JWT_SECRET_KEY')

class SQLAlchemyConfig:
   SQLALCHEMY_DATABASE_URL = "mysql://" + DB_USERNAME + ":" + DB_PASSWORD + "@localhost/" + DB_NAME + "?unix_socket=/var/run/mysqld/mysqld.sock"
   ECHO = False
   AUTO_FLUSH = True
   AUTO_COMMIT = False
   
class SecurityConfig:
   ARGON_TIMECOST = 4
   ARGON_HASHLEN = 64
   ARGON_SALTLEN = 32
   ARGON_TYPE = ArgonType.D
