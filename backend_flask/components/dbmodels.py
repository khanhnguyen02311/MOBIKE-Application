from flask_sqlalchemy import SQLAlchemy
import datetime

db = SQLAlchemy()

class Articles(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    body = db.Column(db.Text(), nullable=False)
    date = db.Column(db.DateTime, default = datetime.datetime.now)
    
    # sqlalchemy auto generate __init__ method, don't need to add to class
