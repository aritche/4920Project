from datetime import datetime
from model import db
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship


class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    address_id = db.Column(db.Integer, ForeignKey('address.id'))
    email = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    creation_date = db.Column(db.Date, nullable=False)
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
        if not '@' in email:
            return False
        return True

    def add_user(email, first_name, last_name, user_type, hashed_password):
        if not self.validate_email(email):
            return {success: False, error: 'The email address is invalid.'}

        # validate names?

        # Check for account with same email
        query_result = db.session.query(User).filter(User.email == email).first()
        if query_result:
            return {success: False, error: 'A user with this email address already exists.'}

        user = User(
            email = email,
            first_name = first_name,
            last_name = last_name,
            user_type = user_type,
            password = hashed_password,
            creation_date = datetime.now()
        )
        db.session.add(user)
        db.session.commit()

        return {success: True, user: user}

    # def authenticate_user(email, password):
        # check user table for email
        # check corresponding password
        # return 0 for good, 1 for no user, 2 for wrong password