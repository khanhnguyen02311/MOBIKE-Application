from marshmallow_sqlalchemy import SQLAlchemySchema as Schema, auto_field
from components import dbmodels as dbm

class AccountSchema(Schema):
    class Meta:
        model = dbm.Account
        load_instance = True
        # include_relationships = True
        # include_fk = False   # default value: False
        
    ID = auto_field()
    Username = auto_field()
    Email = auto_field()
        

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
    Birthdate = auto_field()
    Gender = auto_field()
    Phone_number = auto_field()
    Time_created = auto_field()

