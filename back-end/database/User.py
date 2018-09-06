from model import db

# [START model]
class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255))
    first_name = db.Column(db.String(255))
    last_name = db.Column(db.String(255))
    password = db.Column(db.Integer)
    DOB = db.Column(db.String(255))
    university = db.Column(db.String(255))
    nationality = db.Column(db.String(255))
    resident_history = db.Column(db.String(255))
    interests = db.Column(db.String(255))
    personalities = db.Column(db.String(255))
    description = db.Column(db.String(4000))

    def __repr__(self):
        return "<User(email='%s')" % (self.email)
# [END model]