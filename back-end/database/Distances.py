from sqlalchemy import Column, ForeignKey, Integer, String
from database.model import db


class Distances(db.Model):
    __tablename__ = 'distances'

    id = db.Column(db.Integer, primary_key=True)
    from_string = db.Column(db.String(500), nullable=False)
    to_string = db.Column(db.String(500), nullable=False)
    distance = db.Column(db.Integer, nullable=False) # in metres