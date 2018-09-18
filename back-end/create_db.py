from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from database.model import db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

from database.FromAddress import FromAddress
from database.ToAddress import ToAddress
from database.Comment import Comment
from database.Item import Item
from database.MoveDetails import MoveDetails
from database.User import User

with app.app_context():
    db.drop_all()
    db.create_all()

print("All tables created")