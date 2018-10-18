from sqlalchemy import Column, ForeignKey, Integer, String
from database.model import db


class Postcode(db.Model):
    __tablename__ = 'postcode'

    id = db.Column(db.Integer, primary_key=True)
    postcode = db.Column(db.String(50), nullable=False)
    suburb = db.Column(db.String(100), nullable=False)