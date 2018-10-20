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
from database.Update import Update
from database.Review import Review
from database.PrivateView import PrivateView
from database.Distances import Distances
from database.Postcode import Postcode
from database.PostRecord import PostRecord

with app.app_context():
    db.drop_all()
    db.create_all()

    print("All tables created.")

    js = User(
        email = 'js@ex',
        first_name = 'John',
        last_name = 'Smith',
        password = 'sha1$e1f43782$1$2d02811ef15d94ffc88a2bb29b0cbc5a40e5999a', #aaaaaa
        deleted = False,
        user_type = 'Movee',
        creation_date = datetime.now(),
        description = '',
        phone_number = '0400 111 222',
        avatar = 'male1'
    )

    db.session.add(js)
    db.session.commit()

    ml = User(
        email = 'ml@ex',
        first_name = 'Movee',
        last_name = 'Lee',
        password = 'sha1$e1f43782$1$2d02811ef15d94ffc88a2bb29b0cbc5a40e5999a', #aaaaaa
        deleted = False,
        user_type = 'Movee',
        creation_date = datetime.now(),
        description = '',
        phone_number = '0400 123 123',
        avatar = 'male2'
    )

    db.session.add(ml)
    db.session.commit()

    rj = User(
        email = 'rj@ex',
        first_name = 'Remov',
        last_name = 'Jones',
        password = 'sha1$e1f43782$1$2d02811ef15d94ffc88a2bb29b0cbc5a40e5999a', #aaaaaa
        deleted = False,
        user_type = 'Removalist',
        creation_date = datetime.now(),
        description = 'I have been a trusted removalist for 30 years, ranging from mansions in Russia to apartments in Australia.',
        phone_number = '0400 567 567',
        avatar = 'male3'
    )

    db.session.add(rj)
    db.session.commit()

    hl = User(
        email = 'hl@ex',
        first_name = 'Harper',
        last_name = 'Lee',
        password = 'sha1$e1f43782$1$2d02811ef15d94ffc88a2bb29b0cbc5a40e5999a', #aaaaaa
        deleted = False,
        user_type = 'Removalist',
        creation_date = datetime.now(),
        description = 'I\'m well known for being a careful and trustworthy removalist. Choose my services.',
        phone_number = '0400 999 000',
        avatar = 'female3'
    )

    db.session.add(hl)
    db.session.commit()

    gj = User(
        email = 'gj@ex',
        first_name = 'Greg',
        last_name = 'Jebson',
        password = 'sha1$e1f43782$1$2d02811ef15d94ffc88a2bb29b0cbc5a40e5999a', #aaaaaa
        deleted = False,
        user_type = 'Removalist',
        creation_date = datetime.now(),
        description = 'I run a family business of removalists. We are all efficient and friendly workers.',
        phone_number = '0400 111 222',
        avatar = 'male4'
    )

    db.session.add(gj)
    db.session.commit()

    tl = User(
        email = 'tl@ex',
        first_name = 'Timothy',
        last_name = 'Lee',
        password = 'sha1$e1f43782$1$2d02811ef15d94ffc88a2bb29b0cbc5a40e5999a', #aaaaaa
        deleted = False,
        user_type = 'Removalist',
        creation_date = datetime.now(),
        description = 'I am young and fresh and ready to help my community!',
        phone_number = '0400 333 444',
        avatar = 'male5'
    )

    db.session.add(tl)
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

    now = datetime.now()

    move1 = MoveDetails(
        movee_id = js.id,
        title = 'Example Post',
        closing_datetime1 = datetime.now(),
        closing_datetime2 = datetime.now(),
        description = 'This is an example post. This description is just a placeholder description, but this is how movees will make a first impression with removealists.',
        budget = 400,
        status = 'OPEN',
        creation_datetime = now,
        last_updated = now,
        address_from = from_address.id,
        address_to = to_address.id,
        deleted = False,
        rough_distance = 3541,
        exact_distance = 3541
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


    comment1 = Comment(
        poster=rj.id,
        parent_post=move1.id,
        creation_datetime=datetime.now(),
        text='Hi, can I just confirm that there is only one bed to move?',
        is_offer=False
    )

    move1.comments.append(comment1)
    db.session.commit()

    update1 = Update(
        update_type = 'comment',
        updated_movee_id = move1.movee_id,
        concerning_movee_id = rj.id,
        description='Hi, can I just confirm that there is only one bed to move?',
        move_id = move1.id,
        update_time = datetime.now()
    )

    db.session.add(update1)
    db.session.commit()

    comment2 = Comment(
        poster=js.id,
        parent_post=move1.id,
        creation_datetime=datetime.now(),
        text='Yep! Just the one.',
        is_offer=False,
        parent_comment = comment1.id
    )

    move1.comments.append(comment2)
    db.session.commit()

    print("Initial data added.")