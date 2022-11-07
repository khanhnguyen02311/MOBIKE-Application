from sqlalchemy import Column, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.dialects import mysql as ms
from .dbsettings import Base, Engine
from datetime import datetime, timezone


# RELATIONSHIP: https://docs.sqlalchemy.org/en/14/orm/basic_relationships.html
# SCHEMA ATTRIBUTES: https://docs.sqlalchemy.org/en/14/core/metadata.html

# ==============================================================================
class Permission (Base):
    __tablename__ = 'PERMISSION'
    ID = Column(ms.INTEGER, primary_key=True)
    Name = Column(ms.NVARCHAR(50), nullable=False)
    
    rel_Account = relationship("Account", back_populates="rel_Permission")


# ==============================================================================
class AccountInfo (Base):
    __tablename__ = 'ACCOUNTINFO'
    ID = Column(ms.INTEGER, primary_key=True)
    Name = Column(ms.NVARCHAR(128), nullable=False)
    Birthdate = Column(ms.DATETIME)
    Gender = Column(ms.TINYINT)
    Phone_number = Column(ms.VARCHAR(12), nullable=False)
    Identification_number = Column(ms.VARCHAR(12))
    
    ID_AccountStat = Column(ms.INTEGER, ForeignKey('ACCOUNTSTAT.ID'), nullable=False)
    rel_AccountStat = relationship('AccountStat', back_populates='rel_AccountInfo')
    
    ID_Address = Column(ms.INTEGER, ForeignKey('ADDRESS.ID'))
    rel_Address = relationship('Address', back_populates='rel_AccountInfo')
    
    ID_ImageAccount_Profile = Column(ms.INTEGER, ForeignKey('IMAGEACCOUNT.ID'))
    rel_ImageAccount_Profile = relationship('ImageAccount', back_populates='rel_AccountInfo_Profile')
    
    ID_ImageAccount_Identity = Column(ms.INTEGER, ForeignKey('IMAGEACCOUNT.ID'))
    rel_ImageAccount_Identity = relationship('ImageAccount', back_populates='rel_AccountInfo_Identity')
    
    ## Account reference
    rel_Account = relationship("Account", back_populates="rel_AccountInfo", uselist=False)
    
    
# ==============================================================================
class AccountStat (Base):
    __tablename__ = 'ACCOUNTSTAT'
    ID = Column(ms.INTEGER, primary_key=True)
    General_rating = Column(ms.FLOAT, nullable=False, default=-1)
    Reply_percentage = Column(ms.FLOAT, nullable=False, default=-1)
    Avg_reply_time = Column(ms.FLOAT, nullable=False, default=-1)
    
    ## AccountInfo reference
    rel_AccountInfo = relationship('AccountInfo', back_populates='rel_AccountStat', uselist=False)
    
    
# ==============================================================================
class Account (Base):
    __tablename__ = 'ACCOUNT'
    ID = Column(ms.INTEGER, primary_key=True)
    Username = Column(ms.NVARCHAR(128), nullable=False, unique=True)
    Password = Column(ms.NVARCHAR(256), nullable=False)
    Email = Column(ms.NVARCHAR(128), nullable=False, unique=True)
    Time_created = Column(ms.DATETIME, nullable=False, default=datetime.now(timezone.utc))
    
    ID_Permission = Column(ms.INTEGER, ForeignKey("PERMISSION.ID"), nullable=False)
    rel_Permission = relationship("Permission", back_populates="rel_Account")
    
    ID_AccountInfo = Column(ms.INTEGER, ForeignKey("ACCOUNTINFO.ID"))
    rel_AccountInfo = relationship("AccountInfo", back_populates="rel_Account")

    ## Post reference
    rel_Post = relationship("Post", back_populates="rel_Account")
    
    ## Rating reference
    rel_Rating = relationship("Rating", back_populates="rel_Account")
    
    ## Like reference
    rel_Like = relationship("Like", back_populates="rel_Account")
    
    ## View reference
    rel_View = relationship("View", back_populates="rel_Account")
    
    ## ChatParticipant reference
    rel_ChatParticipant = relationship("ChatParticipant", back_populates="rel_Account")


# ==============================================================================
class Ward (Base):
    __tablename__ = 'WARD'
    ID = Column(ms.INTEGER, primary_key=True)
    Name = Column(ms.NVARCHAR(50), nullable=False)

    ID_District = Column(ms.INTEGER, ForeignKey("DISTRICT.ID"), nullable=False)
    rel_District = relationship("District", back_populates="rel_Ward")


# ==============================================================================
class District (Base):
    __tablename__ = 'DISTRICT'
    ID = Column(ms.INTEGER, primary_key=True)
    Name = Column(ms.NVARCHAR(50), nullable=False)

    ID_City = Column(ms.INTEGER, ForeignKey("CITY.ID"), nullable=False)
    rel_City = relationship("City", back_populates="rel_District")
    
    ## Ward reference
    rel_Ward = relationship('Ward', back_populates='rel_District')
    
    
# ==============================================================================
class City (Base):
    __tablename__ = 'CITY'
    ID = Column(ms.INTEGER, primary_key=True)
    Name = Column(ms.NVARCHAR(50), nullable=False)
    
    ## District reference
    rel_District = relationship("District", back_populates="rel_City")
    
    
# ==============================================================================
class Address (Base):
    __tablename__ = 'ADDRESS'
    ID = Column(ms.INTEGER, primary_key=True)
    Detail_address = Column(ms.NVARCHAR(128))
    
    ID_City = Column(ms.INTEGER, ForeignKey("CITY.ID"), nullable=False)
    rel_City = relationship("City")
        
    ID_District = Column(ms.INTEGER, ForeignKey("DISTRICT.ID"), nullable=False)
    rel_District = relationship("District")
    
    ID_Ward = Column(ms.INTEGER, ForeignKey("WARD.ID"), nullable=False)
    rel_Ward = relationship("Ward")

    ## Post reference
    rel_Post = relationship("Post", back_populates="rel_Address")
    
    ## AccountInfo reference
    rel_AccountInfo = relationship("AccountInfo", back_populates="rel_Address")
        
    
# ==============================================================================
class Post (Base):
    __tablename__ = 'POST'
    ID = Column(ms.INTEGER, primary_key=True)
    Title = Column(ms.NVARCHAR(128), nullable=False)
    Content = Column(ms.NVARCHAR(2000))
    Pricetag = Column(ms.BIGINT)
    Time_created = Column(ms.DATETIME, nullable=False, default=datetime.now(timezone.utc))
    
    
    ID_Account = Column(ms.INTEGER, ForeignKey("ACCOUNT.ID"), nullable=False)
    rel_Account = relationship("Account", back_populates="rel_Post")
    
    ID_Address = Column(ms.INTEGER, ForeignKey("ADDRESS.ID"), nullable=False)
    rel_Address = relationship("Address", back_populates="rel_Post")
    
    ID_VehicleInfo = Column(ms.INTEGER, ForeignKey("VEHICLEINFO.ID"), nullable=False)
    rel_VehicleInfo = relationship("VehicleInfo", back_populates="rel_Post")
    
    ID_PostStat = Column(ms.INTEGER, ForeignKey('POSTSTAT.ID'), nullable=False)
    rel_PostStat = relationship('PostStat', back_populates='rel_Post')

    ## ImagePost reference
    rel_ImagePost = relationship("ImagePost", back_populates="rel_Post")
    
    ## PostStatus reference
    rel_PostStatus = relationship("PostStatus", back_populates="rel_Post")
    
    ## Rating reference
    rel_Rating = relationship("Rating", back_populates="rel_Post")
    
    ## Like reference
    rel_Like = relationship("Like", back_populates="rel_Post")
    
    ## View reference
    rel_View = relationship("View", back_populates="rel_Post")
    
    ## ChatRoom reference
    rel_ChatRoom = relationship("Chatroom", back_populates="rel_Post", uselist=False)
    

# ==============================================================================
class ImageAccount (Base):
    __tablename__ = 'IMAGEACCOUNT'
    ID = Column(ms.INTEGER, primary_key=True)
    Filename = Column(ms.NVARCHAR(64), nullable=False)
    
    ## AccountInfo reference
    rel_AccountInfo_Profile = relationship('AccountInfo', back_populates='rel_ImageAccount_Profile')
    
    ## AccountInfo reference
    rel_AccountInfo_Identity = relationship('AccountInfo', back_populates='rel_ImageAccount_Identity')

    
# ==============================================================================
class ImagePost (Base):
    __tablename__ = 'IMAGEPOST'
    ID = Column(ms.INTEGER, primary_key=True)
    Filename = Column(ms.NVARCHAR(64), nullable=False)
    
    ID_Post = Column(ms.INTEGER, ForeignKey("POST.ID"), nullable=False)
    rel_Post = relationship("Post", back_populates="rel_ImagePost")


# ==============================================================================
class ImageOther (Base):
    __tablename__ = 'IMAGEOTHER'
    ID = Column(ms.INTEGER, primary_key=True)
    Filename = Column(ms.NVARCHAR(64), nullable=False)


# ==============================================================================
class PostStatus (Base):
    __tablename__ = 'POSTSTATUS'
    ID = Column(ms.INTEGER, primary_key=True)
    Status = Column(ms.NVARCHAR(50), nullable=False)
    Time_updated = Column(ms.DATETIME, default=datetime.now(timezone.utc))

    ID_Post = Column(ms.INTEGER, ForeignKey("POST.ID"), nullable=False)
    rel_Post = relationship("Post", back_populates="rel_PostStatus", uselist=False)
    
    
# ==============================================================================
class PostStat (Base):
    __tablename__ = 'POSTSTAT'
    ID = Column(ms.INTEGER, primary_key=True)
    View_amount = Column(ms.INTEGER, nullable=False)
    Like_amount = Column(ms.INTEGER, nullable=False)
    Contact_amount = Column(ms.INTEGER, nullable=False)
    
    rel_Post = relationship("Post", back_populates="rel_PostStat", uselist=False)
    
    
# ==============================================================================
class Rating (Base):
    __tablename__ = 'RATING'
    ID = Column(ms.INTEGER, primary_key=True)
    Rating_point = Column(ms.FLOAT, nullable=False)
    Content = Column(ms.NVARCHAR(2000))
    Time_created = Column(ms.DATETIME, nullable=False, default=datetime.now(timezone.utc))
    
    ID_Post = Column(ms.INTEGER, ForeignKey("POST.ID"), nullable=False)
    rel_Post = relationship("Post", back_populates="rel_Rating")
    
    ID_Account = Column(ms.INTEGER, ForeignKey("ACCOUNT.ID"), nullable=False)
    rel_Account = relationship("Account", back_populates="rel_Rating")
    
    
    
# ==============================================================================
class Like (Base):
    __tablename__ = 'LIKE'
    ID = Column(ms.INTEGER, primary_key=True)
    Time_created = Column(ms.DATETIME, nullable=False, default=datetime.now(timezone.utc))
    
    ID_Post = Column(ms.INTEGER, ForeignKey("POST.ID"), nullable=False)
    rel_Post = relationship("Post", back_populates="rel_Like")
    
    ID_Account = Column(ms.INTEGER, ForeignKey("ACCOUNT.ID"), nullable=False)
    rel_Account = relationship("Account", back_populates="rel_Like")
        
    
# ==============================================================================
class View (Base):
    __tablename__ = 'VIEW'
    ID = Column(ms.INTEGER, primary_key=True)
    Time_created = Column(ms.DATETIME, nullable=False, default=datetime.now(timezone.utc))
    
    ID_Post = Column(ms.INTEGER, ForeignKey("POST.ID"), nullable=False)
    rel_Post = relationship("Post", back_populates="rel_View")
    
    ID_Account = Column(ms.INTEGER, ForeignKey("ACCOUNT.ID"), nullable=False)
    rel_Account = relationship("Account", back_populates="rel_View")
        
    
# ==============================================================================
class VehicleInfo (Base):
    __tablename__ = 'VEHICLEINFO'
    ID = Column(ms.INTEGER, primary_key=True)
    Vehicle_name = Column(ms.NVARCHAR(128), nullable=False)
    Odometer = Column(ms.INTEGER)
    Registration_year = Column(ms.SMALLINT)
    Manufacture_year = Column(ms.SMALLINT)
    Cubic_power = Column(ms.INTEGER)

    ID_Manufacturer = Column(ms.INTEGER, ForeignKey("MANUFACTURER.ID"), nullable=False)
    rel_Manufacturer = relationship("Manufacturer")
    
    ID_VehicleLineup = Column(ms.INTEGER, ForeignKey("VEHICLELINEUP.ID"), nullable=False)
    rel_VehicleLineup = relationship("VehicleLineup")
    
    ID_VehicleType = Column(ms.INTEGER, ForeignKey("VEHICLETYPE.ID"), nullable=False)
    rel_VehicleType = relationship("VehicleType")
    
    ID_Condition = Column(ms.INTEGER, ForeignKey("VEHICLECONDITION.ID"))
    rel_Condition = relationship("VehicleCondition")
    
    ID_Color = Column(ms.INTEGER, ForeignKey("COLOR.ID"), nullable=True)
    rel_Color = relationship("Color")

    ## Post reference
    rel_Post = relationship("Post", back_populates="rel_VehicleInfo", uselist=False)
    
    
# ==============================================================================
class Manufacturer (Base):
    __tablename__ = 'MANUFACTURER'
    ID = Column(ms.INTEGER, primary_key=True)
    Name = Column(ms.NVARCHAR(50), nullable=False)
    
    ID_ImageOther = Column(ms.INTEGER, ForeignKey("IMAGEOTHER.ID"), nullable=True)
    rel_ImageOther = relationship("Image")
    
    
# ==============================================================================
class VehicleLineup (Base):
    __tablename__ = 'VEHICLELINEUP'
    ID = Column(ms.INTEGER, primary_key=True)
    Lineup = Column(ms.NVARCHAR(50), nullable=False)

    ID_Manufacturer = Column(ms.INTEGER, ForeignKey("MANUFACTURER.ID"), nullable=False)
    rel_Manufacturer = relationship('Manufacturer')
    
# ==============================================================================
class VehicleType (Base):
    __tablename__ = 'VEHICLETYPE'
    ID = Column(ms.INTEGER, primary_key=True)
    Type = Column(ms.NVARCHAR(50), nullable=False)
    
    
# ==============================================================================
class VehicleCondition (Base):
    __tablename__ = 'VEHICLECONDITION'
    ID = Column(ms.INTEGER, primary_key=True)
    Condition = Column(ms.NVARCHAR(50), nullable=False)
    
    
# ==============================================================================
class Color (Base):
    __tablename__ = 'COLOR'
    ID = Column(ms.INTEGER, primary_key=True)
    Name = Column(ms.NVARCHAR(20), nullable=False)
    Color_hex = Column(ms.NVARCHAR(6), nullable=False)
    
    
# ==============================================================================
class ChatRoom (Base):
    __tablename__ = 'CHATROOM'
    ID = Column(ms.INTEGER, primary_key=True)
    Time_created = Column(ms.DATETIME, nullable=False, default=datetime.now(timezone.utc))
    
    ID_Post = Column(ms.INTEGER, ForeignKey("POST.ID"))
    rel_Post = relationship("Post", back_populates="rel_ChatRoom")

    ## ChatRoom reference
    rel_ChatParticipant = relationship("ChatParticipant", back_populates="rel_ChatRoom")
    
    ## ChatMessage reference
    rel_ChatMessage = relationship("ChatMessage", back_populates="rel_ChatRoom")
    
    
# ==============================================================================
class ChatParticipant (Base):
    __tablename__ = 'CHATPARTICIPANT'
    ID = Column(ms.INTEGER, primary_key=True)
    
    ID_ChatRoom = Column(ms.INTEGER, ForeignKey("CHATROOM.ID"), nullable=False)
    rel_ChatRoom = relationship("ChatRoom", back_populates="rel_ChatParticipant")
    
    ID_Account = Column(ms.INTEGER, ForeignKey("ACCOUNT.ID"), nullable=False)
    rel_Account = relationship("Account", back_populates="rel_ChatParticipant")
    
    ## ChatMessage reference
    rel_ChatMessage = relationship("ChatMessage", back_populates="rel_ChatParticipant")
    
    
# ==============================================================================
class ChatMessage (Base):
    __tablename__ = 'CHATMESSAGE'
    ID = Column(ms.INTEGER, primary_key=True)
    Content = Column(ms.NVARCHAR(2000), nullable=False)
    Time_created = Column(ms.DATETIME, default=datetime.now(timezone.utc))
    
    ID_ChatRoom = Column(ms.INTEGER, ForeignKey("CHATROOM.ID"), nullable=False)
    rel_ChatRoom = relationship("ChatRoom", back_populates="rel_Message")
    
    ID_ChatParticipant = Column(ms.INTEGER, ForeignKey("CHATPARTICIPANT.ID"), nullable=False)
    rel_ChatParticipant = relationship("ChatParticipant", back_populates="rel_ChatMessage")
    
    
# ==============================================================================
# Base.metadata.drop_all(Engine)
Base.metadata.create_all(Engine)