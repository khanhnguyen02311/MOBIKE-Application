from sqlalchemy import Column, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.dialects import mysql as ms
from .dbsettings import Base, Engine
from datetime import datetime, timezone
    

class AccountInfo (Base):
    __tablename__ = 'ACCOUNTINFO'
    ID = Column(ms.INTEGER, primary_key=True)
    Name = Column(ms.NVARCHAR(64), nullable=False)
    Birthdate = Column(ms.DATE)
    Gender = Column(ms.TINYINT)
    Phone_number = Column(ms.VARCHAR(12), nullable=False)
    Identification_number = Column(ms.VARCHAR(12))
    Time_created = Column(ms.TIMESTAMP, default=datetime.now(timezone.utc))
    
    rel_Account = relationship("Account", back_populates="rel_AccountInfo", lazy='select')
    
    # Classes have been provided with __init__ method, don't need to redefine 
    
    
class Permission (Base):
    __tablename__ = 'PERMISSION'
    ID = Column(ms.INTEGER, primary_key=True)
    Name = Column(ms.NVARCHAR(25), nullable=False)
    
    rel_Account = relationship("Account", back_populates="rel_Permission", lazy='select')
    
    
class Account (Base):
    __tablename__ = 'ACCOUNT'
    ID = Column(ms.INTEGER, primary_key=True)
    Username = Column(ms.VARCHAR(64), nullable=False, unique=True)
    Password = Column(ms.VARCHAR(160), nullable=False, unique=True)
    Email = Column(ms.VARCHAR(64), nullable=False, unique=True)
    
    ID_Permission = Column(ms.INTEGER, ForeignKey("PERMISSION.ID"), nullable=False)
    ID_AccountInfo = Column(ms.INTEGER, ForeignKey("ACCOUNTINFO.ID"))
    
    rel_Permission = relationship("Permission", back_populates="rel_Account", lazy='select')
    rel_AccountInfo = relationship("AccountInfo", back_populates="rel_Account", lazy='select')
    
    
Base.metadata.create_all(Engine)