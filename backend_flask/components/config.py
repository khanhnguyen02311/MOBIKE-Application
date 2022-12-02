from datetime import timedelta
from dotenv import load_dotenv
from os import environ
from argon2 import Type as ArgonType

#HOME_DIRECTORY = '/var/lib/jenkins/workspace/mobike-development/backend_flask/'
HOME_DIRECTORY = '/media/knguyen02311/Data Disk/Learn Programming/ReactDEV/React Native/Mobike-application-stack/backend_flask/'
STORAGE_PATH = HOME_DIRECTORY + 'Storage/'

load_dotenv(dotenv_path=HOME_DIRECTORY + '.env')

DB_USERNAME = environ.get('DBUSERNAME')
DB_PASSWORD = environ.get('DBPASSWORD')
DB_NAME = environ.get('DBNAME')

class FlaskConfig:
   SECRET_KEY = environ.get('SECRET_KEY')
   JWT_SECRET_KEY = environ.get('JWT_SECRET_KEY')
   JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=21)

class SQLAlchemyConfig:
   SQLALCHEMY_DATABASE_URL = "mysql://" + DB_USERNAME + ":" + DB_PASSWORD + "@localhost/" + DB_NAME + "?unix_socket=/var/run/mysqld/mysqld.sock&charset=utf8mb4"
   ECHO = False
   AUTO_FLUSH = True
   AUTO_COMMIT = False
   POOL_SIZE = 15
   MAX_OVERFLOW = 10
   
class RedisConfig:
   HOST = "localhost"
   PORT = 6379
   DB = 0
   DECODE_RESPONSES = True
   PASSWORD = environ.get('REDISPASSWORD')
   
class SecurityConfig:
   ARGON_TIMECOST = 4
   ARGON_HASHLEN = 64
   ARGON_SALTLEN = 32
   ARGON_TYPE = ArgonType.D

class AuthConfig:
   GOOGLE_CLIENT_ID = environ.get('GOOGLE_CLIENT_ID')
   GOOGLE_CLIENT_SECRET = environ.get('GOOGLE_CLIENT_SECRET')