from model import db

# [START model]
class MoveDetails(db.Model):
    __tablename__ = 'movedetails'

    id = db.Column(db.Integer, primary_key=True)
    item_set = db.Column(db.Integer, ForeignKey('item.id'))
    poster = db.Column(db.String(255), ForeignKey('user.id'))
    address_from = db.Column(db.String(255), ForeignKey('address.id'))
    address_to = db.Column(db.String(255), ForeignKey('address.id'))
    title = db.Column(db.String(4), nullable=False)
    closing_date = db.Column(db.String(4), nullable=False)
    description = db.Column(db.String(4), nullable=False)
    offer_amount = db.Column(db.String(4), nullable=False)
    status = db.Column(db.String(4), nullable=False)
    creation_datetime = db.Column(db.String(4), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'poster': self.poster,
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
# [END model]