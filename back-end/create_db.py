from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from database.model import db
from datetime import datetime


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

from database.FromAddress import FromAddress
from database.ToAddress import ToAddress
from database.Comment import Comment
from database.Item import Item
from database.MoveDetails import MoveDetails
from database.User import User

with app.app_context():
    db.drop_all()
    db.create_all()

    print("All tables created.")

    user1 = User(
        email = 'js@ex',
        first_name = 'John',
        last_name = 'Smith',
        password = 'sha1$e1f43782$1$2d02811ef15d94ffc88a2bb29b0cbc5a40e5999a', #aaaaaa
        deleted = False,
        user_type = 'Movee',
        creation_date = datetime.now(),
        description = '',
        phone_number = '',
        avatar = 'male1'
    )

    db.session.add(user1)
    db.session.commit()

    from_address = FromAddress(
        line1 = '1 Example Rd',
        line2 = '',
        city = 'Kensington',
        state = 'NSW',
        postcode = '2000'
    )
    db.session.add(from_address)

    to_address = ToAddress(
        line1 = '2 Example St',
        line2 = '',
        city = 'Randwick',
        state = 'NSW',
        postcode = '2001'
    )
    db.session.add(to_address)
    db.session.commit()

    move1 = MoveDetails(
        movee_id = user1.id,
        title = 'Example Post',
        closing_datetime1 = datetime.now(),
        closing_datetime2 = datetime.now(),
        description = 'This is an example post. This description is just a placeholder description, but this is how movees will make a first impression with removealists.',
        budget = 400,
        status = 'OPEN',
        creation_datetime = datetime.now(),
        address_from = from_address.id,
        address_to = to_address.id,
        deleted = False
    )
    db.session.add(move1)
    db.session.commit()

    from_address.move_id = move1.id
    to_address.move_id = move1.id
    db.session.commit()

    item1 = Item(
        name = 'Queen Bed',
        weight = '50',
        volume = '2x2x2',
        amount = '1',
        description = 'As you\'d expect. Large bed',
        move_id = move1.id
    )
    db.session.add(item1)
    db.session.commit()

    print("Initial data added.")