from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from .config import SQLAlchemyConfig as cfg

Engine = create_engine(url=cfg.SQLALCHEMY_DATABASE_URL, echo=cfg.ECHO)
Base = declarative_base()

def new_Session():
   return scoped_session(sessionmaker(bind=Engine, autoflush=cfg.AUTO_FLUSH, autocommit=cfg.AUTO_COMMIT))