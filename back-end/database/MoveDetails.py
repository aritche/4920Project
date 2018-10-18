from database.model import db
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship

class MoveDetails(db.Model):
    __tablename__ = 'movedetails'

    id = db.Column(db.Integer, primary_key=True)
    movee_id = db.Column(db.Integer, ForeignKey('user.id'), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    closing_datetime1 = db.Column(db.DateTime, nullable=False)
    closing_datetime2 = db.Column(db.DateTime, nullable=False)
    description = db.Column(db.String(255), nullable=False)
    budget = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(255), nullable=False)
    creation_datetime = db.Column(db.DateTime, nullable=False)
    last_updated = db.Column(db.DateTime, nullable=False)
    address_from = db.Column(db.Integer, ForeignKey('fromaddress.id'), nullable=False)
    address_to = db.Column(db.Integer, ForeignKey('toaddress.id'), nullable=False)
    deleted = db.Column(db.Boolean, nullable=False)
    chosen_offer = db.Column(db.Integer)
    rough_distance = db.Column(db.Integer, nullable=False)
    exact_distance = db.Column(db.Integer, nullable=False)

    items = relationship('Item')
    comments = relationship('Comment')

    def to_dict(self):
        return {
            'id': self.id,
            'movee_id': self.movee_id,
            'address_from': self.address_from,
            'address_to': self.address_to,
            'title': self.title,
            'closing_datetime1': self.closing_datetime1,
            'closing_datetime2': self.closing_datetime2,
            'description': self.description,
            'budget': self.budget,
            'status': self.status,
            'creation_datetime': self.creation_datetime,
            'deleted': self.deleted,
            'chosen_offer': self.chosen_offer if self.chosen_offer else -1,
            'last_updated': self.last_updated,
        }