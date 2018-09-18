from model import db


class Comment(db.Model):
    __tablename__ = 'comment'

    id = db.Column(db.Integer, primary_key=True)
    poster = db.Column(db.Integer, ForeignKey('user.id'))
    parent_post = db.Column(db.Integer, ForeignKey('move.id'))
    creation_datetime = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    offer_amount = db.Column(db.String(255), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'poster': self.poster,
            'parent_post': self.parent_post,
            'creation_datetime': self.creation_datetime,
            'description': self.description,
            'offer_amount': self.offer_amount,
        }

    def __repr__(self):
        return "<User(email='%s')" % (self.email)