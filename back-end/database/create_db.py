from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from model import db

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///../test.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

from User import User

with app.app_context():
    db.create_all()

print("All tables created")