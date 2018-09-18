from database.model import db
from sqlalchemy import ForeignKey


class MoveDetails(db.Model):
    __tablename__ = 'movedetails'

    id = db.Column(db.Integer, primary_key=True)
    item_set = db.Column(db.Integer, ForeignKey('item.id'), nullable=False)
    movee_id = db.Column(db.Integer, ForeignKey('user.id'), nullable=False)
    address_from = db.Column(db.Integer, ForeignKey('address.id'), nullable=False)
    address_to = db.Column(db.Integer, ForeignKey('address.id'), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    closing_date = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    offer_amount = db.Column(db.String(255), nullable=False)
    status = db.Column(db.String(255), nullable=False)
    creation_datetime = db.Column(db.String(255), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'movee_id': self.movee_id,
            'address_from': self.address_from,
            'address_to': self.address_to,
            'title': self.title,
            'closing_date': self.closing_date,
            'description': self.description,
            'offer_amount': self.offer_amount,
            'status': self.status,
            'creation_datetime': self.creation_datetime
        }

    def __repr__(self):
        return "<User(email='%s')" % (self.email)