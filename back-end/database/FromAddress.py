from sqlalchemy import ForeignKey
from database.model import db


class FromAddress(db.Model):
    __tablename__ = 'fromaddress'

    id = db.Column(db.Integer, primary_key=True)
    line1 = db.Column(db.String(255), nullable=False)
    line2 = db.Column(db.String(255), nullable=False)
    state = db.Column(db.String(10), nullable=False)
    postcode = db.Column(db.String(10), nullable=False)
    move_id = db.Column(db.Integer, ForeignKey('movedetails.id'))

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
        return "<FromAddress(address='%s')" % (full_address)