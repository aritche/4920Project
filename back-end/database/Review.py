from database.model import db
from sqlalchemy import ForeignKey, Column, Integer, String
from sqlalchemy.orm import relationship

class Review(db.Model):
    __tablename__ = 'review'

    id = db.Column(db.Integer, primary_key=True)
    poster = db.Column(db.Integer, nullable=False)
    reviewed_user = db.Column(db.Integer, ForeignKey('user.id'), nullable=False)
    move = db.Column(db.Integer, ForeignKey('movedetails.id'))
    creation_datetime = db.Column(db.DateTime, nullable=False)
    rating_general = db.Column(db.Integer)
    rating_reliability = db.Column(db.Integer)
    rating_service = db.Column(db.Integer)
    rating_speed = db.Column(db.Integer)
    review = db.Column(db.String(500), nullable=False)
    deleted = db.Column(db.Boolean, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'poster': self.poster,
            'reviewed_user': self.reviewed_user,
            'creation_datetime': self.creation_datetime,
            'rating_speed': self.rating_speed if self.rating_speed else 0,
            'rating_reliability': self.rating_reliability if self.rating_reliability else 0,
            'rating_service': self.rating_service if self.rating_service else 0,
            'rating_general': self.rating_general if self.rating_general else 0,
            'review': self.review,
            'deleted': self.deleted
        }