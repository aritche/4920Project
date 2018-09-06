from model import db

# [START model]
class Room(db.Model):
    __tablename__ = 'rooms'

    id = db.Column(db.Integer, primary_key=True)
    furnitures = db.Column(db.String(255))
    cultures = db.Column(db.String(255))
    room_rules = db.Column(db.String(255))
    room_number = db.Column(db.Integer)
    cost_per_week = db.Column(db.Integer)
    college = db.Column(db.String(255))
    price_category = db.Column(db.String(255))
    available_date = db.Column(db.String(255))
    room_type = db.Column(db.String(255))
    description = db.Column(db.String(4000))

    def __repr__(self):
        return "<Room(title='room_number')" % (self.room_number)
# [END model]