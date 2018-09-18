from sqlalchemy.orm import relationship
from database.model import db


class Address(db.Model):
    __tablename__ = 'address'

    id = db.Column(db.Integer, primary_key=True)
    line1 = db.Column(db.String(255), nullable=False)
    line2 = db.Column(db.String(255), nullable=False)
    state = db.Column(db.String(4), nullable=False)
    postcode = db.Column(db.String(4), nullable=False)
    user = relationship("User", back_populates="address")

    def to_dict(self):
        return {
            'id': self.id,
            'line1': self.line1,
            'line2': self.line2,
            'state': self.state,
            'postcode': self.postcode
        }

    def __repr__(self):
        full_address = line1 + " " + line2 + " " + state + " " + postcode
        return "<Address(address='%s')" % (full_address)