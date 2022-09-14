from flask_marshmallow import Marshmallow

ma = Marshmallow()
    
# class ArticleSchema(ma.Schema):
#     class Meta:
#         fields = ('id', 'title', 'body', 'date')
        
# article_schema = ArticleSchema()
# articles_schema = ArticleSchema(many=True)

class ColorSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'hex')

color_schema = ColorSchema()
colors_schema = ColorSchema(many=True)


class VehicleConditionSchema(ma.Schema):
    class Meta:
        fields = ('id', 'condition')

vehicleConditionSchema = VehicleConditionSchema()
vehicleConditionsSchema = VehicleConditionSchema(many=True)