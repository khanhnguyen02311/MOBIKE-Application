from datetime import timedelta
import platform
from dotenv import load_dotenv
from os import environ
from argon2 import Type as ArgonType

HOME_DIRECTORY = '/app'
STORAGE_PATH ='/app/storage'

load_dotenv('/app/.env.example')

DB_USERNAME = environ.get('DBUSERNAME')
DB_PASSWORD = environ.get('DBPASSWORD')
DB_NAME = environ.get('DBNAME')

IsTrueServer = True

class FlaskConfig:
   SECRET_KEY = environ.get('SECRET_KEY')
   JWT_SECRET_KEY = environ.get('JWT_SECRET_KEY')
   JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=21)
   DEBUG_TOOLBAR_ENABLED = True

class SQLAlchemyConfig:
   SQLALCHEMY_DATABASE_URL = "mysql+mysqldb://" + DB_USERNAME + ":" + DB_PASSWORD + "@localhost:3306/" + DB_NAME # + "?unix_socket=/var/run/mysqld/mysqld.sock&charset=utf8mb4" 
   # (IsTrueServer and "?unix_socket=/var/run/mysqld/mysqld.sock&charset=utf8mb4" or "")
   ECHO = False
   AUTO_FLUSH = True
   AUTO_COMMIT = False
   POOL_SIZE = 15
   MAX_OVERFLOW = 10
   POOL_PRE_PING = True
   
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