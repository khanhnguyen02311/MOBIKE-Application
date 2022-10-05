from datetime import datetime
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow


app = Flask(__name__)
ma = Marshmallow(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/mobike'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# region Models

# region VehicleCondition
class VehicleCondition(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    condition = db.Column(db.String(50), nullable=False)

    def __init__(self, condition):
        self.condition = condition

class VehicleConditionSchema(ma.Schema):
    class Meta:
        fields = ('id', 'condition')

vehicleConditionSchema = VehicleConditionSchema()
vehicleConditionsSchema = VehicleConditionSchema(many=True)

# endregion


# region Color
class Color(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    hex = db.Column(db.String(6), nullable=False)
    
    def __init__(self, name, hex):
        self.name = name
        self.hex = hex

class ColorSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'hex')

color_schema = ColorSchema()
colors_schema = ColorSchema(many=True)
# endregion


# region VehicleLineUp




# endregion

# endregion

if __name__ == '__main__':
    app.run(host='192.168.0.167', port=3000, debug=True)