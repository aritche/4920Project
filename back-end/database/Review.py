from database.model import db
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

class Review(db.Model):
    __tablename__ = 'review'

    id = db.Column(db.Integer, primary_key=True)
    poster = db.Column(db.Integer, ForeignKey('user.id'), nullable=False)
    reviewed_user = db.Column(db.Integer, ForeignKey('user.id'), nullable=False)
    move = db.Column(db.Integer, ForeignKey('move.id')) # not sure if needed
    creation_datetime = db.Column(db.DateTime, nullable=False)
    rating_general = db.Column(db.Integer, nullable=True)
    rating_reliability = db.Column(db.Integer, nullable=True)
    rating_service = db.Column(db.Integer, nullable=True)
    rating_speed = db.Column(db.Integer, nullable=True)
    review = db.Column(db.String(500), nullable=False)
    deleted = db.Column(db.Boolean, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'poster': self.poster,
            'reviewed_user': self.reviewed_user,
            'creation_datetime': self.creation_datetime,
            'rating_speed': self.rating_speed,
            'rating_reliability': self.rating_reliability,
            'rating_service': self.rating_service,
            'rating_general': self.rating_general,
            'review': self.review,
            'deleted': self.deleted
        }