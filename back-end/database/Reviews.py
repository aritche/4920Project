from database.model import db
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

class Comment(db.Model):
    __tablename__ = 'comment'

    id = db.Column(db.Integer, primary_key=True)
    poster = db.Column(db.Integer, ForeignKey('user.id'), nullable=False)
    reviewed_user = db.Column(db.Integer, ForeignKey('user.id'), nullable=False)
    move = db.Column(db.Integer, ForeignKey('move.id')) # not sure if needed
    creation_datetime = db.Column(db.DateTime, nullable=False)
    review = db.Column(db.String(500), nullable=False)
    rating = db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'poster': self.poster,
            'reviewed_user': self.reviewed_user,
            'creation_datetime': self.creation_datetime,
            'review': self.review,
            'rating': self.rating,
        }