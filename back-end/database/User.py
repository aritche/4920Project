from datetime import datetime
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
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
    description = db.Column(db.String(4000), nullable=False)
    phone_number = db.Column(db.String(50), nullable=False)
    avatar = db.Column(db.String(255), nullable=False)

    comments = relationship('Comment')
    # reviews = relationship('Review')
    post_records = relationship('PostRecord')

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'password': self.password,
            'deleted': self.deleted,
            'user_type': self.user_type,
            'description': self.description,
            'phone_number': self.phone_number,
            'avatar': self.avatar,
            'creation_date': self.creation_date
        }