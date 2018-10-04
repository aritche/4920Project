from database.model import db
from sqlalchemy import ForeignKey

class Comment(db.Model):
    __tablename__ = 'comment'

    id = db.Column(db.Integer, primary_key=True)
    poster = db.Column(db.Integer, ForeignKey('user.id'))
    parent_post = db.Column(db.Integer, ForeignKey('movedetails.id'))
    creation_datetime = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'poster': self.poster,
            'parent_post': self.parent_post,
            'creation_datetime': self.creation_datetime,
            'description': self.description,
        }