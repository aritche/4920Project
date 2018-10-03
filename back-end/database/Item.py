from database.model import db
from sqlalchemy import ForeignKey


class Item(db.Model):
    __tablename__ = 'item'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    volume = db.Column(db.String(255), nullable=False)
    weight = db.Column(db.String(255), nullable=False)
    amount = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    move_id = db.Column(db.Integer, ForeignKey('movedetails.id'), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'volume': self.volume,
            'weight': self.weight,
            'amount': self.amount,
            'description': self.description,
            'move_id': self.move_id,
        }

    def __repr__(self):
        return "<User(email='%s')" % (self.email)