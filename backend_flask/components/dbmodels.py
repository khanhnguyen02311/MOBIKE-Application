from tokenize import Number
from sqlalchemy import Column, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.dialects import mysql as ms
from .dbsettings import Base, Engine
from datetime import datetime, timezone


# RELATIONSHIP: https://docs.sqlalchemy.org/en/14/orm/basic_relationships.html
# SCHEMA ATTRIBUTES: https://docs.sqlalchemy.org/en/14/core/metadata.html

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
    General_rating = Column(ms.FLOAT, nullable=False)
    Reply_percentage = Column(ms.FLOAT, nullable=False)
    Avg_reply_time = Column(ms.FLOAT, nullable=False)
    
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
    rel_Post = relationship("Post", back_populates="rel_Account", uselist=False)
    
    
    # rel_Rating = relationship("Rating", back_populates="rel_Account", lazy='select')
    # rel_ChatroomMember = relationship("ChatroomMember", back_populates="rel_Account", lazy='select')
    # rel_Message = relationship("Message", back_populates="rel_Account", lazy='select')
    # rel_Like = relationship("Like", back_populates="rel_Account", lazy='select')


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
class Permission (Base):
    __tablename__ = 'PERMISSION'
    ID = Column(ms.INTEGER, primary_key=True)
    Name = Column(ms.NVARCHAR(50), nullable=False)
    
    rel_Account = relationship("Account", back_populates="rel_Permission")


# ==============================================================================
class Ward (Base):
    __tablename__ = 'WARD'
    ID = Column(ms.INTEGER, primary_key=True)
    Name = Column(ms.NVARCHAR(50), nullable=False)

    ID_District = Column(ms.INTEGER, ForeignKey("DISTRICT.ID"), nullable=False)
    rel_District = relationship("District", back_populates="rel_Ward")
    
    rel_Address = relationship("Address", back_populates="rel_Ward", uselist=False)

# ==============================================================================
class District (Base):
    __tablename__ = 'DISTRICT'
    ID = Column(ms.INTEGER, primary_key=True)
    Name = Column(ms.NVARCHAR(50), nullable=False)

    ID_City = Column(ms.INTEGER, ForeignKey("CITY.ID"), nullable=False)
    rel_City = relationship("City", back_populates="rel_District")
    
    ## Ward reference
    rel_Ward = relationship('Ward', back_populates='rel_District')
    
    ## Address reference
    rel_Address = relationship("Address", back_populates="rel_District", uselist=False)
    
    
# ==============================================================================
class City (Base):
    __tablename__ = 'CITY'
    ID = Column(ms.INTEGER, primary_key=True)
    Name = Column(ms.NVARCHAR(50), nullable=False)
    
    ## District reference
    rel_District = relationship("District", back_populates="rel_City")
    
    ## Address reference
    rel_Address = relationship("Address", back_populates="rel_City", uselist=False)
    
    
# ==============================================================================
class Address (Base):
    __tablename__ = 'ADDRESS'
    ID = Column(ms.INTEGER, primary_key=True)
    Detail_address = Column(ms.NVARCHAR(128))
    
    ID_City = Column(ms.INTEGER, ForeignKey("CITY.ID"), nullable=False)
    rel_City = relationship("City", back_populates="rel_Address")
        
    ID_District = Column(ms.INTEGER, ForeignKey("DISTRICT.ID"), nullable=False)
    rel_District = relationship("District", back_populates="rel_Address")
    
    ID_Ward = Column(ms.INTEGER, ForeignKey("WARD.ID"), nullable=False)
    rel_Ward = relationship("Ward", back_populates="rel_Address")

    ## Post reference
    rel_Post = relationship("Post", back_populates="rel_Address", uselist=False)
    
    ## AccountInfo reference
    rel_AccountInfo = relationship("AccountInfo", back_populates="rel_Address", uselist=False)
        
    
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
    
    # rel_Rating = relationship("Rating", back_populates="rel_Post", lazy='select')
    # rel_Chatroom = relationship("Chatroom", back_populates="rel_Post", lazy='select')
    # rel_Like = relationship("Like", back_populates="rel_Post", lazy='select')
    
    
# ==============================================================================
class ImagePost (Base):
    __tablename__ = 'IMAGEPOST'
    ID = Column(ms.INTEGER, primary_key=True)
    Filename = Column(ms.NVARCHAR(64), nullable=False)
    
    ID_Post = Column(ms.INTEGER, ForeignKey("POST.ID"), nullable=False)
    rel_Post = relationship("Post", back_populates="rel_ImagePost")

    # rel_Manufacturer = relationship("Manufacturer", back_populates="rel_Image", lazy='select')
    # rel_ProfileImage = relationship("ProfileImage", back_populates="rel_Image", lazy='select')
    # rel_IdentityImage = relationship("IdentityImage", back_populates="rel_Image", lazy='select')


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
    
    # ID_Post = Column(ms.INTEGER, ForeignKey("POST.ID"), nullable=False)
    # ID_Account = Column(ms.INTEGER, ForeignKey("ACCOUNT.ID"), nullable=False)
    
    # rel_Account = relationship("Account", back_populates="rel_Rating", lazy='select')
    # rel_Post = relationship("Post", back_populates="rel_Rating", lazy='select')
    
    
# ==============================================================================
class Like (Base):
    __tablename__ = 'LIKE'
    ID = Column(ms.INTEGER, primary_key=True)
    
    # ID_Post = Column(ms.INTEGER, ForeignKey("POST.ID"), primary_key=True, nullable=False)
    # ID_Account = Column(ms.INTEGER, ForeignKey("ACCOUNT.ID"), primary_key=True, nullable=False)
    # rel_Account = relationship("Account", back_populates="rel_Like", lazy='select')
    # rel_Post = relationship("Post", back_populates="rel_Like", lazy='select')
        
    
# ==============================================================================
class View (Base):
    __tablename__ = 'VIEW'
    ID = Column(ms.INTEGER, primary_key=True)
    Time_created = Column(ms.DATETIME, nullable=False, default=datetime.now(timezone.utc))
        
    
# ==============================================================================
class VehicleInfo (Base):
    __tablename__ = 'VEHICLEINFO'
    ID = Column(ms.INTEGER, primary_key=True)
    Vehicle_name = Column(ms.NVARCHAR(128), nullable=False)
    Odometer = Column(ms.INTEGER)
    Registration_year = Column(ms.SMALLINT)
    Manufacture_year = Column(ms.SMALLINT)
    Cubic_power = Column(ms.INTEGER)

    # ID_Manufacturer = Column(ms.INTEGER, ForeignKey("MANUFACTURER.ID"), nullable=False)
    # ID_VehicleLineup = Column(ms.INTEGER, ForeignKey("VEHICLELINEUP.ID"), nullable=False)
    # ID_VehicleType = Column(ms.INTEGER, ForeignKey("VEHICLETYPE.ID"), nullable=False)
    # ID_Condition = Column(ms.INTEGER, ForeignKey("VEHICLECONDITION.ID"), nullable=True)
    # ID_Color = Column(ms.INTEGER, ForeignKey("COLOR.ID"), nullable=True)

    # rel_Manufacturer = relationship("Manufacturer", back_populates="rel_VehicleInfo", lazy='select')
    # rel_VehicleLineup = relationship("VehicleLineup", back_populates="rel_VehicleInfo", lazy='select')
    # rel_VehicleType = relationship("VehicleType", back_populates="rel_VehicleInfo", lazy='select')
    # rel_Condition = relationship("VehicleCondition", back_populates="rel_VehicleInfo", lazy='select')
    # rel_Color = relationship("Color", back_populates="rel_VehicleInfo", lazy='select')

    ## Post reference
    rel_Post = relationship("Post", back_populates="rel_VehicleInfo", uselist=False)
    
    
# ==============================================================================
class Manufacturer (Base):
    __tablename__ = 'MANUFACTURER'
    ID = Column(ms.INTEGER, primary_key=True)
    Name = Column(ms.NVARCHAR(50), nullable=False)
    
    # ID_Image = Column(ms.INTEGER, ForeignKey("IMAGE.ID"), nullable=True)

    # rel_Image = relationship("Image", back_populates="rel_Manufacturer", lazy='select')
    
    # rel_VehicleInfo = relationship("VehicleInfo", back_populates="rel_Manufacturer", lazy='select')
    # rel_VehicleLineup = relationship("VehicleLineup", back_populates="rel_Manufacturer", lazy='select')
    
    
# ==============================================================================
class VehicleLineup (Base):
    __tablename__ = 'VEHICLELINEUP'
    ID = Column(ms.INTEGER, primary_key=True)
    Lineup = Column(ms.NVARCHAR(50), nullable=False)

    # ID_Manufacturer = Column(ms.INTEGER, ForeignKey("MANUFACTURER.ID"), nullable=False)

    # rel_Manufacturer = relationship("Manufacturer", back_populates="rel_VehicleLineup", lazy='select')
    
    # rel_VehicleInfo = relationship("VehicleInfo", back_populates="rel_VehicleLineup", lazy='select')
    
    
# ==============================================================================
class VehicleType (Base):
    __tablename__ = 'VEHICLETYPE'
    ID = Column(ms.INTEGER, primary_key=True)
    Type = Column(ms.NVARCHAR(50), nullable=False)

    # rel_VehicleInfo = relationship("VehicleInfo", back_populates="rel_VehicleType", lazy='select')
    
    
# ==============================================================================
class VehicleCondition (Base):
    __tablename__ = 'VEHICLECONDITION'
    ID = Column(ms.INTEGER, primary_key=True)
    Condition = Column(ms.NVARCHAR(50), nullable=False)

    # rel_VehicleInfo = relationship("VehicleInfo", back_populates="rel_Condition", lazy='select')
    
    
# ==============================================================================
class Color (Base):
    __tablename__ = 'COLOR'
    ID = Column(ms.INTEGER, primary_key=True)
    Name = Column(ms.NVARCHAR(20), nullable=False)
    Color_hex = Column(ms.NVARCHAR(6), nullable=False)

    # rel_VehicleInfo = relationship("VehicleInfo", back_populates="rel_Color", lazy='select')
    
    
# ==============================================================================
class ChatRoom (Base):
    __tablename__ = 'CHATROOM'
    ID = Column(ms.INTEGER, primary_key=True)
    
    # ID_Post = Column(ms.INTEGER, ForeignKey("POST.ID"), nullable=False)
    
    # rel_Post = relationship("Post", back_populates="rel_Chatroom", lazy='select')

    # rel_ChatroomMember = relationship("ChatroomMember", back_populates="rel_Chatroom", lazy='select')
    # rel_Message = relationship("Message", back_populates="rel_Chatroom", lazy='select')
    
    
# ==============================================================================
class ChatParticipant (Base):
    __tablename__ = 'CHATPARTICIPANT'
    ID = Column(ms.INTEGER, primary_key=True)
    
    # ID_Chatroom = Column(ms.INTEGER, ForeignKey("CHATROOM.ID"), primary_key=True)
    # ID_Account = Column(ms.INTEGER, ForeignKey("ACCOUNT.ID"), primary_key=True)
    
    # rel_Chatroom = relationship("Chatroom", back_populates="rel_ChatroomMember", lazy='select')
    # rel_Account = relationship("Account", back_populates="rel_ChatroomMember", lazy='select')
    
    
# ==============================================================================
class ChatMessage (Base):
    __tablename__ = 'CHATMESSAGE'
    ID = Column(ms.INTEGER, primary_key=True)
    Content = Column(ms.NVARCHAR(2000), nullable=False)
    Time_created = Column(ms.DATETIME, default=datetime.now(timezone.utc))
    
    # ID_Chatroom = Column(ms.INTEGER, ForeignKey("CHATROOM.ID"), nullable=False)
    # ID_Account = Column(ms.INTEGER, ForeignKey("ACCOUNT.ID"), nullable=False)
    
    # rel_Chatroom = relationship("Chatroom", back_populates="rel_Message", lazy='select')
    # rel_Account = relationship("Account", back_populates="rel_Message", lazy='select')
    
    
# ==============================================================================
Base.metadata.create_all(Engine)