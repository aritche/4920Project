from sqlalchemy import Column, ForeignKey, Integer, String
from database.model import db


class PostRecord(db.Model):
    __tablename__ = 'postrecord'

    id = db.Column(db.Integer, primary_key=True)
    move_id = db.Column(db.Integer, ForeignKey('movedetails.id'), nullable=False)
    last_updated  = db.Column(db.DateTime, nullable=False)
    user_id = db.Column(db.Integer, ForeignKey('user.id'), nullable=False)