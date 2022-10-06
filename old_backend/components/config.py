from dotenv import load_dotenv
import os

load_dotenv(dotenv_path='./../.env')

class AppConfig:
   SECRET_KEY = os.getenv('SECRET_KEY')
   JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')
   SQLALCHEMY_DATABASE_URI = os.getenv('SQLALCHEMY_DATABASE_URI')
   SQLALCHEMY_TRACK_MODIFICATIONS = False
   SQLALCHEMY_ECHO = True