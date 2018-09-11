from model import db

# [START model]
class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    date_of_birth = db.Column(db.Date, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'password': self.password,
            'date_of_birth': self.date_of_birth
        }

    def __repr__(self):
        return "<User(email='%s')" % (self.email)
# [END model]