import redis
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from .config import SQLAlchemyConfig as scfg

Engine = create_engine(url=scfg.SQLALCHEMY_DATABASE_URL, echo=scfg.ECHO)
Base = declarative_base()

def new_Session():
   return scoped_session(sessionmaker(bind=Engine, autoflush=scfg.AUTO_FLUSH, autocommit=scfg.AUTO_COMMIT))