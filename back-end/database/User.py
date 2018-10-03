from datetime import datetime
from sqlalchemy import Column, ForeignKey, Integer, String
from database.model import db


class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    creation_date = db.Column(db.DateTime, nullable=False)
    user_type = db.Column(db.String(255), nullable=False)
    deleted = db.Column(db.Boolean, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'password': self.password,
            'deleted': self.deleted,
            'user_type': self.user_type
        }

    def __repr__(self):
        return "<User(email='%s')" % (self.email)