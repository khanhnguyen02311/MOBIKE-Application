from flask_marshmallow import Marshmallow

ma = Marshmallow()
    
class ArticleSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'body', 'date')
        
article_schema = ArticleSchema()
articles_schema = ArticleSchema(many=True)