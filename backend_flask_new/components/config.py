from dotenv import load_dotenv
import os
from .z_devname import name


load_dotenv(dotenv_path='./../.env')

class FlaskConfig:
   SECRET_KEY = os.getenv('SECRET_KEY')
   JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')

class SQLAlchemyConfig:
   SQLALCHEMY_DATABASE_URL = (name == "Khoa") and "mysql://root@localhost/flask" or (name == "Khanh" and "mysql://mysqluser1:user1pwd@localhost/workingdatabase2?unix_socket=/var/run/mysqld/mysqld.sock" or "mysql://root@localhost/flask")
   ECHO = True
   AUTO_FLUSH = True
   AUTO_COMMIT = False