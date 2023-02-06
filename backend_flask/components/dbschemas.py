from marshmallow_sqlalchemy import SQLAlchemySchema as Schema, auto_field
from marshmallow import fields
from components import dbmodels as dbm

class AccountSchema(Schema):
    class Meta:
        model = dbm.Account
        load_instance = True
        # include_relationships = True
        # include_fk = False   # default value: False
        
    ID = auto_field()
    Username = auto_field()
    ID_Permission = auto_field()
    ID_AccountInfo = auto_field()
    ID_AccountStat = auto_field()

class PermissionSchema(Schema):
    class Meta:
        model = dbm.Permission
        load_instance = True

    ID = auto_field()
    Name = auto_field()

class AccountInfoSchema(Schema):
    class Meta:
        model = dbm.AccountInfo
        load_instance = True

    ID = auto_field()
    Name = auto_field()
    Birthdate = fields.DateTime(format='%d/%m/%Y')
    Gender = auto_field()
    Phone_number = auto_field()
    Identification_number = auto_field()
    ID_Image_Profile = auto_field()
    Time_created = auto_field()
    
class AccountInfoSchemaShort(Schema):
    class Meta:
        model = dbm.AccountInfo
        load_instance = True

    ID = auto_field()
    Name = auto_field()
    ID_Image_Profile = auto_field()
    
class AddressSchema(Schema):
    class Meta:
        model = dbm.Address
        load_instance = True
        
    ID = auto_field()
    Detail_address = auto_field()
    ID_City = auto_field()
    ID_District = auto_field()
    ID_Ward = auto_field()

class WardSchema(Schema):
    class Meta:
        model = dbm.Ward
        load_instance = True
        
    ID = auto_field()
    Name = auto_field()
    ID_District = auto_field()

class DistrictSchema(Schema):
    class Meta:
        model = dbm.District
        load_instance = True
        
    ID = auto_field()
    Name = auto_field()
    ID_City = auto_field()

class CitySchema(Schema):
    class Meta:
        model = dbm.City
        load_instance = True
        
    ID = auto_field()
    Name = auto_field()

class ImageTypeSchema(Schema):
    class Meta:
        model = dbm.ImageType
        load_instance = True
        
    ID = auto_field()
    Name = auto_field()

class VehicleBrandSchema(Schema):
    class Meta:
        model = dbm.VehicleBrand
        load_instance = True
        
    ID = auto_field()
    Name = auto_field()
    ID_Image = auto_field()
    
class VehicleLineupSchema(Schema):
    class Meta:
        model = dbm.VehicleLineup
        load_instance = True
        
    ID = auto_field()
    Lineup = auto_field()
    ID_VehicleBrand = auto_field()
    
class VehicleTypeSchema(Schema):
    class Meta:
        model = dbm.VehicleType
        load_instance = True
        
    ID = auto_field()
    Type = auto_field()

class VehicleConditionSchema(Schema):
    class Meta:
        model = dbm.VehicleCondition
        load_instance = True
        
    ID = auto_field()
    Condition = auto_field()
    
class ColorSchema(Schema):
    class Meta:
        model = dbm.Color
        load_instance = True
        
    ID = auto_field()
    Name = auto_field()
    Color_hex = auto_field()

class VersionSchema(Schema):
    class Meta:
        model = dbm.Version
        load_instance = True
        
    ID = auto_field()
    Name = auto_field()
    Version = auto_field()
    
class PostSchemaShort(Schema):
    class Meta:
        model = dbm.Post
        load_instance = True
    
    ID = auto_field()
    Title = auto_field()
    Pricetag = auto_field()
    rel_Image = auto_field()
    Time_created = auto_field()

class PostSchema(Schema):
    class Meta:
        model = dbm.Post
        load_instance = True
        
    ID = auto_field()
    Title = auto_field()
    Content = auto_field()
    Pricetag = auto_field()
    ID_Account = auto_field()
    ID_Address = auto_field()
    ID_VehicleInfo = auto_field()
    Time_created = auto_field()
    rel_Image = auto_field()
    rel_Like = auto_field()
    rel_Rating = auto_field()
    

class PostStatusSchema(Schema):
    class Meta:
        model = dbm.PostStatus
        load_instance = True
    
    ID = auto_field()
    Status = auto_field()
    Information = auto_field()
    ID_Post = auto_field()
    
class VehicleInfoSchema(Schema):
    class Meta:
        model = dbm.VehicleInfo
        load_instance = True
        
    ID = auto_field()
    Vehicle_name = auto_field()
    Odometer = auto_field()
    License_plate = auto_field()
    Manufacture_year = auto_field()
    Cubic_power = auto_field()
    ID_VehicleBrand = auto_field()
    ID_VehicleLineup = auto_field()
    ID_VehicleType = auto_field()
    ID_Condition = auto_field()
    ID_Color = auto_field()
    
    
class ViewSchema(Schema):
    class Meta:
        model = dbm.View
        load_instance = True
        
    ID = auto_field()
    ID_Account = auto_field()
    Time_created = auto_field()
    

class CommentSchema(Schema):
    class Meta:
        model = dbm.Comment
        load_instance = True
        
    ID = auto_field()
    ID_Account = auto_field()
    Content = auto_field()
    Time_created = auto_field()
    
    
class LikeSchema(Schema):
    class Meta:
        model = dbm.Like
        load_instance = True
        
    ID = auto_field()
    ID_Account = auto_field()
    Time_created = auto_field()
    

class RatingSchema(Schema):
    class Meta:
        model = dbm.Rating
        load_instance = True
        
    ID = auto_field()
    ID_Account = auto_field()
    Rating_point = auto_field()
    Content = auto_field()
    Time_created = auto_field()