from database.model import db
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

class Comment(db.Model):
    __tablename__ = 'comment'

    id = db.Column(db.Integer, primary_key=True)
    poster = db.Column(db.Integer, ForeignKey('user.id'), nullable=False)
    parent_post = db.Column(db.Integer, ForeignKey('movedetails.id'), nullable=False)
    creation_datetime = db.Column(db.DateTime, nullable=False)
    text = db.Column(db.String(500), nullable=False)
    parent_comment = db.Column(db.Integer, ForeignKey('comment.id'))
    child_comments = relationship('Comment')


    def to_dict(self):
        return {
            'id': self.id,
            'poster': self.poster,
            'parent_post': self.parent_post,
            'creation_datetime': self.creation_datetime,
            'text': self.text,
        }