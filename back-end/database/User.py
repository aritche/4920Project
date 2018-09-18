from datetime import datetime
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from database.model import db


class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    address_id = db.Column(db.Integer, ForeignKey('address.id'))
    email = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    creation_date = db.Column(db.Date, nullable=False)
    user_type = db.Column(db.String(255), nullable=False)

    address = relationship("Address", back_populates="user")

    def to_dict(self):
        return {
            'id': self.id,
            'address_id': self.address_id,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'password': self.password
        }

    def __repr__(self):
        return "<User(email='%s')" % (self.email)