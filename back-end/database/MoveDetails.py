from database.model import db
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

class MoveDetails(db.Model):
    __tablename__ = 'movedetails'

    id = db.Column(db.Integer, primary_key=True)
    movee_id = db.Column(db.Integer, ForeignKey('user.id'), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    closing_date = db.Column(db.Date, nullable=False)
    description = db.Column(db.String(255), nullable=False)
    budget = db.Column(db.String(255), nullable=False)
    status = db.Column(db.String(255), nullable=False)
    creation_datetime = db.Column(db.Date, nullable=False)
    address_from = db.Column(db.Integer, ForeignKey('fromaddress.id'), nullable=False)
    address_to = db.Column(db.Integer, ForeignKey('toaddress.id'), nullable=False)
    items = relationship('Item')

    def to_dict(self):
        return {
            'id': self.id,
            'movee_id': self.movee_id,
            'address_from': self.address_from.to_dict(),
            'address_to': self.address_to.to_dict(),
            'title': self.title,
            'closing_date': self.closing_date,
            'description': self.description,
            'offer_amount': self.offer_amount,
            'status': self.status,
            'creation_datetime': self.creation_datetime
        }

    def __repr__(self):
        return "<User(email='%s')" % (self.email)