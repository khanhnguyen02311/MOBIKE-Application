from csv import Dialect
from flask_sqlalchemy import SQLAlchemy
import datetime

db = SQLAlchemy()

# class Articles(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     title = db.Column(db.String(100), nullable=False)
#     body = db.Column(db.Text(), nullable=False)
#     date = db.Column(db.DateTime, default = datetime.datetime.now)

# sqlalchemy auto generate __init__ method, don't need to add to class


# region Vehicle Information
class Color(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    hex = db.Column(db.String(6), nullable=False)


class VehicleCondition(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    condition = db.Column(db.String(50), nullable=False)


class VehicleType(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50), nullable=False)


class VehicleLineUp(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    lineUp = db.Column(db.String(50), nullable=False)

    id_manufacturer = db.Column(db.Integer, db.ForeignKey(
        'manufacturer.id'), nullable=False)
    manufacturer = db.relationship(
        'Manufacturer', backref=db.backref('vehicleLineUp', lazy=True))


class Manufacturer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

    id_image = db.Column(db.Integer, db.ForeignKey('image.id'), nullable=False)
    image = db.relationship(
        'Image', backref=db.backref('manufacturer', lazy=True))


class VehicleInfo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    vehicle_name = db.Column(db.String(128), nullable=False)
    odometer = db.Column(db.Integer, nullable=True)
    registration_year = db.Column(db.Integer, nullable=True)
    manufacturer_year = db.Column(db.Integer, nullable=True)
    cubic_power = db.Column(db.Integer, nullable=True)

    id_manufacturer = db.Column(db.Integer, db.ForeignKey(
        'manufacturer.id'), nullable=False)
    manufacturer = db.relationship(
        'Manufacturer', backref=db.backref('vehicleInfo', lazy=True))

    id_vehicle_line_up = db.Column(db.Integer, db.ForeignKey(
        'vehicle_line_up.id'), nullable=False)
    vehicle_line_up = db.relationship(
        'VehicleLineUp', backref=db.backref('vehicleInfo', lazy=True))

    id_vehicle_type = db.Column(db.Integer, db.ForeignKey(
        'vehicle_type.id'), nullable=False)
    vehicle_type = db.relationship(
        'VehicleType', backref=db.backref('vehicleInfo', lazy=True))

    id_vehicle_condition = db.Column(
        db.Integer, db.ForeignKey('vehicle_condition.id'), nullable=True)
    vehicle_condition = db.relationship(
        'VehicleCondition', backref=db.backref('vehicleInfo', lazy=True))

    id_color = db.Column(db.Integer, db.ForeignKey('color.id'), nullable=True)
    color = db.relationship(
        'Color', backref=db.backref('vehicleInfo', lazy=True))

# endregion

# region Address


class Address(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    detail_address = db.Column(db.String(128), nullable=False)

    id_city = db.Column(db.Integer, db.ForeignKey('city.id'), nullable=False)
    city = db.relationship('City', backref=db.backref('address', lazy=True))

    id_district = db.Column(db.Integer, db.ForeignKey(
        'district.id'), nullable=False)
    district = db.relationship(
        'District', backref=db.backref('address', lazy=True))

    id_ward = db.Column(db.Integer, db.ForeignKey('ward.id'), nullable=False)
    ward = db.relationship('Ward', backref=db.backref('address', lazy=True))


class City(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)


class District(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    id_city = db.Column(db.Integer, db.ForeignKey('city.id'), nullable=False)


class Ward(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    id_district = db.Column(db.Integer, db.ForeignKey(
        'district.id'), nullable=False)


# endregion

# region Account

class Permission(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

class AccountInfo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    birthday = db.Column(db.DateTime, nullable=True)
    gender = db.Column(db.Interfer, nullable=True)

    id_address = db.Column(db.Integer, db.ForeignKey(
        'address.id'), nullable=False)
    address = db.relationship(
        'Address', backref=db.backref('accountInfo', lazy=True))



# endregion



