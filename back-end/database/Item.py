from database.model import db
from sqlalchemy import ForeignKey


class Item(db.Model):
    __tablename__ = 'item'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Integer, ForeignKey('address.id'), nullable=False)
    volume = db.Column(db.String(255), nullable=False)
    weight = db.Column(db.String(255), nullable=False)
    amount = db.Column(db.String(255), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'volume': self.volume,
            'weight': self.weight,
            'amount': self.amount,
        }

    def __repr__(self):
        return "<User(email='%s')" % (self.email)