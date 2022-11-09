from dotenv import load_dotenv
from os import environ
from argon2 import Type as ArgonType

HOME_DIRECTORY = '../'
load_dotenv(dotenv_path=HOME_DIRECTORY + '.env')

DB_USERNAME = environ.get('DBUSERNAME') or 'mysqluser1'
DB_PASSWORD = environ.get('DBPASSWORD') or 'user1pwd'
DB_NAME = environ.get('DBNAME') or 'workingdatabase2'

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
