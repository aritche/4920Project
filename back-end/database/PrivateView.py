from sqlalchemy import Column, ForeignKey, Integer, String
from database.model import db


class PrivateView(db.Model):
    __tablename__ = 'privateview'

    id = db.Column(db.Integer, primary_key=True)
    viewable_user = db.Column(db.Integer, ForeignKey('user.id'), nullable=False)
    viewer = db.Column(db.Integer, ForeignKey('user.id'), nullable=False)

    def get_viewer(self):
        return self.viewer