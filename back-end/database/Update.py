from database.model import db
from sqlalchemy import ForeignKey


class Update(db.Model):
    __tablename__ = 'update'

    id = db.Column(db.Integer, primary_key=True)
    update_type = db.Column(db.String(255), nullable=False)
    updated_movee_id = db.Column(db.String(255), nullable=False)
    concerning_movee_id = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    amount = db.Column(db.Integer)
    move_id = db.Column(db.Integer, ForeignKey('movedetails.id'), nullable=False)
    update_time = db.Column(db.DateTime, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'update_type': self.update_type,
            'updated': self.updated_movee_id,
            'concerning': self.concerning_movee_id,
            'description': self.description,
            'move_id': self.move_id,
            'update_time': self.update_time
        }
