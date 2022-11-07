from tokenize import Number
from sqlalchemy import Column, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.dialects import mysql as ms
from .dbsettings import Base, Engine
from datetime import datetime, timezone
    

class AccountInfo (Base):
    __tablename__ = 'ACCOUNTINFO'
    ID = Column(ms.INTEGER, primary_key=True)
    Name = Column(ms.NVARCHAR(128), nullable=False)
    Birthdate = Column(ms.DATETIME, nullable=True)
    Gender = Column(ms.TINYINT, nullable=True)
    Phone_number = Column(ms.VARCHAR(12), nullable=False)
    Identification_number = Column(ms.VARCHAR(12), nullable=True)
    General_rating = Column(ms.FLOAT, nullable=False)
    Time_created = Column(ms.TIMESTAMP, default=datetime.now(timezone.utc))
    
    ID_Address = Column(ms.INTEGER, ForeignKey('ADDRESS.ID'))

    rel_Address = relationship('Address', back_populates='rel_AccountInfo')

    rel_Account = relationship("Account", back_populates="rel_AccountInfo", lazy='select')
    rel_ProfileImage = relationship("ProfileImage", back_populates="rel_AccountInfo", lazy='select')
    rel_IdentityImage = relationship("IdentityImage", back_populates="rel_AccountInfo", lazy='select')
    

class ProfileImage (Base):
    __tablename__ = 'PROFILEIMAGE'
    ID_AccountInfo = Column(ms.INTEGER, ForeignKey('ACCOUNTINFO.ID'), primary_key=True)
    ID_Image = Column(ms.INTEGER, ForeignKey('IMAGE.ID'), primary_key=True)

    rel_AccountInfo = relationship("AccountInfo", back_populates="rel_ProfileImage", lazy='select')
    rel_Image = relationship("Image", back_populates="rel_ProfileImage", lazy='select')


class IdentityImage (Base):
    __tablename__ = 'IDENTITYIMAGE'
    ID_AccountInfo = Column(ms.INTEGER, ForeignKey('ACCOUNTINFO.ID'), primary_key=True)
    ID_Image = Column(ms.INTEGER, ForeignKey('IMAGE.ID'), primary_key=True)

    rel_AccountInfo = relationship("AccountInfo", back_populates="rel_IdentityImage", lazy='select')
    rel_Image = relationship("Image", back_populates="rel_IdentityImage", lazy='select')


class Permission (Base):
    __tablename__ = 'PERMISSION'
    ID = Column(ms.INTEGER, primary_key=True)
    Name = Column(ms.NVARCHAR(25), nullable=False)
    
    rel_Account = relationship("Account", back_populates="rel_Permission", lazy='select')
    
    
class Account (Base):
    __tablename__ = 'ACCOUNT'
    ID = Column(ms.INTEGER, primary_key=True)
    Username = Column(ms.NVARCHAR(128), nullable=False, unique=True)
    Password = Column(ms.NVARCHAR(256), nullable=False, unique=True)
    Email = Column(ms.NVARCHAR(128), nullable=False, unique=True)
    
    ID_Permission = Column(ms.INTEGER, ForeignKey("PERMISSION.ID"), nullable=False)
    ID_AccountInfo = Column(ms.INTEGER, ForeignKey("ACCOUNTINFO.ID"))
    
    rel_Permission = relationship("Permission", back_populates="rel_Account", lazy='select')
    rel_AccountInfo = relationship("AccountInfo", back_populates="rel_Account", lazy='select')

    rel_Post = relationship("Post", back_populates="rel_Account", lazy='select')
    rel_Rating = relationship("Rating", back_populates="rel_Account", lazy='select')
    rel_ChatroomMember = relationship("ChatroomMember", back_populates="rel_Account", lazy='select')
    rel_Message = relationship("Message", back_populates="rel_Account", lazy='select')
    rel_Like = relationship("Like", back_populates="rel_Account", lazy='select')


class Ward (Base):
    __tablename__ = 'WARD'
    ID = Column(ms.INTEGER, primary_key=True)
    Name = Column(ms.NVARCHAR(50), nullable=False)

    ID_District = Column(ms.INTEGER, ForeignKey("DISTRICT.ID"), nullable=False)
    
    rel_District = relationship("District", back_populates="rel_Ward", lazy='select')

    rel_Address = relationship("Address", back_populates="rel_Ward", lazy='select')


class District (Base):
    __tablename__ = 'DISTRICT'
    ID = Column(ms.INTEGER, primary_key=True)
    Name = Column(ms.NVARCHAR(50), nullable=False)

    ID_City = Column(ms.INTEGER, ForeignKey("CITY.ID"), nullable=False)
    
    rel_City = relationship("City", back_populates="rel_District", lazy='select')

    rel_Ward = relationship("Ward", back_populates="rel_District", lazy='select')
    rel_Address = relationship("Address", back_populates="rel_District", lazy='select')

class City (Base):
    __tablename__ = 'CITY'
    ID = Column(ms.INTEGER, primary_key=True)
    Name = Column(ms.NVARCHAR(50), nullable=False)
    
    rel_District = relationship("District", back_populates="rel_City", lazy='select')
    rel_Address = relationship("Address", back_populates="rel_City", lazy='select')


class Address (Base):
    __tablename__ = 'ADDRESS'
    ID = Column(ms.INTEGER, primary_key=True)
    Detail_address = Column(ms.NVARCHAR(128), nullable=True)
    
    ID_City = Column(ms.INTEGER, ForeignKey("CITY.ID"), nullable=False)
    ID_District = Column(ms.INTEGER, ForeignKey("DISTRICT.ID"), nullable=False)
    ID_Ward = Column(ms.INTEGER, ForeignKey("WARD.ID"), nullable=False)
    
    rel_City = relationship("City", back_populates="rel_Address", lazy='select')
    rel_District = relationship("District", back_populates="rel_Address", lazy='select')
    rel_Ward = relationship("Ward", back_populates="rel_Address", lazy='select')
    
    rel_Post = relationship("Post", back_populates="rel_Address", lazy='select')
    rel_AccountInfo = relationship("AccountInfo", back_populates="rel_Address", lazy='select')

class Post(Base):
    __tablename__ = 'POST'
    ID = Column(ms.INTEGER, primary_key=True)
    Title = Column(ms.NVARCHAR(128), nullable=False)
    Content = Column(ms.NVARCHAR(2000), nullable=True)
    Pricetag = Column(ms.BIGINT, nullable=True)
    Time_added = Column(ms.TIMESTAMP, default=datetime.now(timezone.utc))
    
    
    ID_Account = Column(ms.INTEGER, ForeignKey("ACCOUNT.ID"), nullable=False)
    ID_Address = Column(ms.INTEGER, ForeignKey("ADDRESS.ID"), nullable=False)
    ID_VehicleInfo = Column(ms.INTEGER, ForeignKey("VEHICLEINFO.ID"), nullable=False)
    ID_PostStatistics = Column(ms.INTEGER, ForeignKey("POSTSTATISTICS.ID"), nullable=False)
    
    rel_Account = relationship("Account", back_populates="rel_Post", lazy='select')
    rel_Address = relationship("Address", back_populates="rel_Post", lazy='select')
    rel_VehicleInfo = relationship("VehicleInfo", back_populates="rel_Post", lazy='select')
    rel_PostStatistics = relationship("PostStatistics", back_populates="rel_Post", lazy='select')

    rel_Image = relationship("Image", back_populates="rel_Post", lazy='select')
    rel_PostStatus = relationship("PostStatus", back_populates="rel_Post", lazy='select')
    rel_Rating = relationship("Rating", back_populates="rel_Post", lazy='select')
    rel_Chatroom = relationship("Chatroom", back_populates="rel_Post", lazy='select')
    rel_Like = relationship("Like", back_populates="rel_Post", lazy='select')


class Image(Base):
    __tablename__ = 'IMAGE'
    ID = Column(ms.INTEGER, primary_key=True)
    ID_Post = Column(ms.INTEGER, ForeignKey("POST.ID"), nullable=True)
    ID_ImageType = Column(ms.INTEGER, ForeignKey("IMAGETYPE.ID"), nullable=False)
    ImageLocation = Column(ms.NVARCHAR(256), nullable=False)
    
    rel_Post = relationship("Post", back_populates="rel_Image", lazy='select')
    rel_ImageType = relationship("ImageType", back_populates="rel_Image", lazy='select')

    rel_Manufacturer = relationship("Manufacturer", back_populates="rel_Image", lazy='select')
    rel_ProfileImage = relationship("ProfileImage", back_populates="rel_Image", lazy='select')
    rel_IdentityImage = relationship("IdentityImage", back_populates="rel_Image", lazy='select')

class ImageType(Base):
    __tablename__ = 'IMAGETYPE'
    ID = Column(ms.INTEGER, primary_key=True)
    Name = Column(ms.NVARCHAR(50), nullable=False, unique=True)

    rel_Image = relationship("Image", back_populates="rel_ImageType", lazy='select')

class PostStatus(Base):
    __tablename__ = 'POSTSTATUS'
    ID = Column(ms.INTEGER, primary_key=True)
    Status = Column(ms.NVARCHAR(50), nullable=False)
    Time_updated = Column(ms.TIMESTAMP, default=datetime.now(timezone.utc))

    ID_Post = Column(ms.INTEGER, ForeignKey("POST.ID"), nullable=False)
    
    rel_Post = relationship("Post", back_populates="rel_PostStatus", lazy='select')


class PostStatistics(Base):
    __tablename__ = 'POSTSTATISTICS'
    ID = Column(ms.INTEGER, primary_key=True)
    Access_amount = Column(ms.INTEGER, nullable=False)
    Like = Column(ms.INTEGER, nullable=False)
    Reply_percentage = Column(ms.FLOAT, nullable=False)
    
    rel_Post = relationship("Post", back_populates="rel_PostStatistics", lazy='select')


class Rating(Base):
    __tablename__ = 'RATING'
    ID = Column(ms.INTEGER, primary_key=True)
    Rating_point = Column(ms.TINYINT, nullable=False)
    Content = Column(ms.NVARCHAR(2000), nullable=True)
    Time_added = Column(ms.TIMESTAMP, default=datetime.now(timezone.utc))
    
    ID_Post = Column(ms.INTEGER, ForeignKey("POST.ID"), nullable=False)
    ID_Account = Column(ms.INTEGER, ForeignKey("ACCOUNT.ID"), nullable=False)
    
    rel_Account = relationship("Account", back_populates="rel_Rating", lazy='select')
    rel_Post = relationship("Post", back_populates="rel_Rating", lazy='select')


class Like(Base):
    __tablename__ = 'LIKE'    
    ID_Post = Column(ms.INTEGER, ForeignKey("POST.ID"), primary_key=True, nullable=False)
    ID_Account = Column(ms.INTEGER, ForeignKey("ACCOUNT.ID"), primary_key=True, nullable=False)
    
    rel_Account = relationship("Account", back_populates="rel_Like", lazy='select')
    rel_Post = relationship("Post", back_populates="rel_Like", lazy='select')

class VehicleInfo(Base):
    __tablename__ = 'VEHICLEINFO'
    ID = Column(ms.INTEGER, primary_key=True)
    Vehicle_name = Column(ms.NVARCHAR(128), nullable=False)
    Odometer = Column(ms.INTEGER, nullable=True)
    Registration_year = Column(ms.SMALLINT, nullable=True)
    Manufacture_year = Column(ms.SMALLINT, nullable=True)
    Cubic_power = Column(ms.INTEGER, nullable=True)

    ID_Manufacturer = Column(ms.INTEGER, ForeignKey("MANUFACTURER.ID"), nullable=False)
    ID_VehicleLineup = Column(ms.INTEGER, ForeignKey("VEHICLELINEUP.ID"), nullable=False)
    ID_VehicleType = Column(ms.INTEGER, ForeignKey("VEHICLETYPE.ID"), nullable=False)
    ID_Condition = Column(ms.INTEGER, ForeignKey("VEHICLECONDITION.ID"), nullable=True)
    ID_Color = Column(ms.INTEGER, ForeignKey("COLOR.ID"), nullable=True)

    rel_Manufacturer = relationship("Manufacturer", back_populates="rel_VehicleInfo", lazy='select')
    rel_VehicleLineup = relationship("VehicleLineup", back_populates="rel_VehicleInfo", lazy='select')
    rel_VehicleType = relationship("VehicleType", back_populates="rel_VehicleInfo", lazy='select')
    rel_Condition = relationship("VehicleCondition", back_populates="rel_VehicleInfo", lazy='select')
    rel_Color = relationship("Color", back_populates="rel_VehicleInfo", lazy='select')

    rel_Post = relationship("Post", back_populates="rel_VehicleInfo", lazy='select')


class Manufacturer(Base):
    __tablename__ = 'MANUFACTURER'
    ID = Column(ms.INTEGER, primary_key=True)
    Name = Column(ms.NVARCHAR(50), nullable=False)
    
    ID_Image = Column(ms.INTEGER, ForeignKey("IMAGE.ID"), nullable=True)

    rel_Image = relationship("Image", back_populates="rel_Manufacturer", lazy='select')
    
    rel_VehicleInfo = relationship("VehicleInfo", back_populates="rel_Manufacturer", lazy='select')
    rel_VehicleLineup = relationship("VehicleLineup", back_populates="rel_Manufacturer", lazy='select')

    
class VehicleLineup(Base):
    __tablename__ = 'VEHICLELINEUP'
    ID = Column(ms.INTEGER, primary_key=True)
    Lineup = Column(ms.NVARCHAR(50), nullable=False)

    ID_Manufacturer = Column(ms.INTEGER, ForeignKey("MANUFACTURER.ID"), nullable=False)

    rel_Manufacturer = relationship("Manufacturer", back_populates="rel_VehicleLineup", lazy='select')
    
    rel_VehicleInfo = relationship("VehicleInfo", back_populates="rel_VehicleLineup", lazy='select')


class VehicleType(Base):
    __tablename__ = 'VEHICLETYPE'
    ID = Column(ms.INTEGER, primary_key=True)
    Type = Column(ms.NVARCHAR(50), nullable=False)

    rel_VehicleInfo = relationship("VehicleInfo", back_populates="rel_VehicleType", lazy='select')


class VehicleCondition(Base):
    __tablename__ = 'VEHICLECONDITION'
    ID = Column(ms.INTEGER, primary_key=True)
    Condition = Column(ms.NVARCHAR(50), nullable=False)

    rel_VehicleInfo = relationship("VehicleInfo", back_populates="rel_Condition", lazy='select')


class Color(Base):
    __tablename__ = 'COLOR'
    ID = Column(ms.INTEGER, primary_key=True)
    Name = Column(ms.NVARCHAR(20), nullable=False)
    Color_Hex = Column(ms.NVARCHAR(6), nullable=False)

    rel_VehicleInfo = relationship("VehicleInfo", back_populates="rel_Color", lazy='select')


class Chatroom(Base):
    __tablename__ = 'CHATROOM'
    ID = Column(ms.INTEGER, primary_key=True)
    
    ID_Post = Column(ms.INTEGER, ForeignKey("POST.ID"), nullable=False)
    
    rel_Post = relationship("Post", back_populates="rel_Chatroom", lazy='select')

    rel_ChatroomMember = relationship("ChatroomMember", back_populates="rel_Chatroom", lazy='select')
    rel_Message = relationship("Message", back_populates="rel_Chatroom", lazy='select')


class ChatroomMember(Base):
    __tablename__ = 'CHATROOMMEMBER'
    ID_Chatroom = Column(ms.INTEGER, ForeignKey("CHATROOM.ID"), primary_key=True)
    ID_Account = Column(ms.INTEGER, ForeignKey("ACCOUNT.ID"), primary_key=True)
    
    rel_Chatroom = relationship("Chatroom", back_populates="rel_ChatroomMember", lazy='select')
    rel_Account = relationship("Account", back_populates="rel_ChatroomMember", lazy='select')


class Message(Base):
    __tablename__ = 'MESSAGE'
    ID = Column(ms.INTEGER, primary_key=True)
    Content = Column(ms.NVARCHAR(2000), nullable=False)
    Time_created = Column(ms.TIMESTAMP, default=datetime.now(timezone.utc))
    
    ID_Chatroom = Column(ms.INTEGER, ForeignKey("CHATROOM.ID"), nullable=False)
    ID_Account = Column(ms.INTEGER, ForeignKey("ACCOUNT.ID"), nullable=False)
    
    rel_Chatroom = relationship("Chatroom", back_populates="rel_Message", lazy='select')
    rel_Account = relationship("Account", back_populates="rel_Message", lazy='select')

class Version(Base):
    __tablename__ = 'VERSION'
    ID = Column(ms.INTEGER, primary_key=True)
    Name = Column(ms.NVARCHAR(50), nullable=False, unique=True)
    Version = Column(ms.INTEGER, nullable=False)

Base.metadata.create_all(Engine)