from flask import Blueprint, request, jsonify
from .dbmodels import *
from .schemas import *
from .__init__ import db

bpviews = Blueprint('bpviews', __name__)


@bpviews.route('/get', methods = ['GET'])
def get_articles():
    all_articles = Articles.query.all()
    return articles_schema.jsonify(all_articles)


@bpviews.route('/get/<id>', methods = ['GET'])
def get_article(id):
    article_detail = Articles.query.get(id)
    return article_schema.jsonify(article_detail)


@bpviews.route('/update/<id>', methods = ['PUT'])
def update_article(id):
    article_detail = Articles.query.get(id)
    new_title = request.json['title']
    new_body = request.json['body']
    article_detail.title = new_title
    article_detail.body = new_body
    db.session.commit()
    return article_schema.jsonify(article_detail)


@bpviews.route('/add', methods = ['POST'])
def add_article():
    _title = request.json['title']
    _body = request.json['body']
    article = Articles(title=_title, body=_body)
    db.session.add(article)
    db.session.commit()
    return article_schema.jsonify(article)


@bpviews.route('/del/<id>', methods = ['DELETE'])
def del_article(id):
    article_detail = Articles.query.get(id)
    db.session.delete(article_detail)
    db.session.commit()
    return article_schema.jsonify(article_detail)