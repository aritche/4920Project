from model import db
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
# [START model]
class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    address_id = db.Column(db.Integer, ForeignKey('address.id'), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    creation_date = db.Column(db.String(255), nullable=False)
    user_type = db.Column(db.String(255), nullable=False)

    address = relationship("Address", back_populates="user")

    def to_dict(self):
        return {
            'id': self.id,
            'address_id': self.address_id,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'password': self.password
        }

    def __repr__(self):
        return "<User(email='%s')" % (self.email)

    def validate_email(self, key, email):
        # need to add in more validation rules
        assert '@' in email
        return email

    # def add_user(email, first_name, last_name, user_type):
        # will create session
        # validate email
        # insert email
        # validate names
        # input names
        # get/input unique id, address_id 
        # input password
        # input creation_date
        # input user_type
        # return successful or not

    # def login_validation(email, password):
        # check user table for email 
        # check corresponding password
        # return 0 for good, 1 for no user, 2 for wrong password

    # def unique_id_generator(table):
        # from table
        # get the last id
        # return the id + 1



# [END model]










