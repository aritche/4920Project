from model import db

# [START model]
class College(db.Model):
    __tablename__ = 'colleges'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    cultures = db.Column(db.String(255))
    suburb = db.Column(db.String(255))
    street = db.Column(db.String(255))
    street_number = db.Column(db.Integer)
    university = db.Column(db.String(255))
    price_category = db.Column(db.String(255))
    residents = db.Column(db.String(255))
    leadership_team = db.Column(db.String(255))
    amenities = db.Column(db.String(255))
    description = db.Column(db.String(4000))

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
        }

    def __repr__(self):
        return "<College(name='%s')" % (self.name)
# [END model]