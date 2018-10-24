from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from database.model import db
from datetime import datetime, timedelta


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


    # Users
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

    cp = User(
        email = 'cp@ex',
        first_name = 'Chance',
        last_name = 'Paulson',
        password = 'sha1$e1f43782$1$2d02811ef15d94ffc88a2bb29b0cbc5a40e5999a', #aaaaaa
        deleted = False,
        user_type = 'Movee',
        creation_date = datetime.now(),
        description = 'I move once a year so please be friends with me.',
        phone_number = '0400 313 444',
        avatar = 'female3'
    )

    db.session.add(cp)
    db.session.commit()

    aw = User(
        email = 'aw@ex',
        first_name = 'Arnold',
        last_name = 'Wilson',
        password = 'sha1$e1f43782$1$2d02811ef15d94ffc88a2bb29b0cbc5a40e5999a', #aaaaaa
        deleted = False,
        user_type = 'Movee',
        creation_date = datetime.now(),
        description = 'I\'m too old to move things myself. Please help me!',
        phone_number = '0400 133 444',
        avatar = 'male2'
    )

    db.session.add(aw)
    db.session.commit()

    gv = User(
        email = 'gv@ex',
        first_name = 'Gary',
        last_name = 'Vayner',
        password = 'sha1$e1f43782$1$2d02811ef15d94ffc88a2bb29b0cbc5a40e5999a', #aaaaaa
        deleted = False,
        user_type = 'Movee',
        creation_date = datetime.now(),
        description = 'Too busy to move things. Need some help. Willing to pay big bucks for good quality work!',
        phone_number = '0400 133 443',
        avatar = 'male6'
    )

    db.session.add(gv)
    db.session.commit()

    cs = User(
        email = 'cs@ex',
        first_name = 'Casey',
        last_name = 'Neistat',
        password = 'sha1$e1f43782$1$2d02811ef15d94ffc88a2bb29b0cbc5a40e5999a', #aaaaaa
        deleted = False,
        user_type = 'Movee',
        creation_date = datetime.now(),
        description = 'Too busy to move things. Need some help. Willing to pay big bucks for good quality work!',
        phone_number = '0400 133 413',
        avatar = 'male7'
    )

    db.session.add(cs)
    db.session.commit()


    # MOVE 1
    from_address = FromAddress(
        line1 = '1 Example Rd',
        line2 = '',
        city = 'Kensington',
        state = 'NSW',
        postcode = '2033'
    )
    db.session.add(from_address)

    to_address = ToAddress(
        line1 = '2 Example St',
        line2 = '',
        city = 'Randwick',
        state = 'NSW',
        postcode = '2031'
    )
    db.session.add(to_address)
    db.session.commit()

    now = datetime.now() - timedelta(days=1, hours=2, minutes=13)

    move1 = MoveDetails(
        movee_id = js.id,
        title = 'Queen Bed in Kensington',
        closing_datetime1 = datetime.now() + timedelta(days=14, hours=1, minutes=24),
        closing_datetime2 = datetime.now() + timedelta(days=14, hours=6, minutes=24),
        description = 'This is an example post. This description is just a placeholder description, but this is how movees will make a first impression with removalists.',
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
        weight = 50,
        volume = 10,
        amount = 1,
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

    update2 = Update(
        update_type = 'comment_reply',
        updated_movee_id = rj.id,
        concerning_movee_id = js.id,
        description='Yep! Just the one.',
        move_id = move1.id,
        update_time = datetime.now()
    )
    db.session.add(update2)
    db.session.commit()

    post_record1 = PostRecord(
        move_id = move1.id,
        last_updated = datetime.now(),
        user_id = rj.id
    )
    rj.post_records.append(post_record1)
    db.session.commit()

    # MOVE 2
    from_address = FromAddress(
        line1 = '1 Example Rd',
        line2 = '',
        city = 'Randwick',
        state = 'NSW',
        postcode = '2031'
    )
    db.session.add(from_address)

    to_address = ToAddress(
        line1 = '2 Example St',
        line2 = '',
        city = 'Randwick',
        state = 'NSW',
        postcode = '2031'
    )
    db.session.add(to_address)
    db.session.commit()

    now = datetime.now()

    move2 = MoveDetails(
        movee_id = ml.id,
        title = 'Short distance move!',
        closing_datetime1 = datetime.now() + timedelta(days=14, hours=3, minutes=41),
        closing_datetime2 = datetime.now() + timedelta(days=14, hours=10, minutes=41),
        description = 'I just need a few things moved a really short distance!',
        budget = 250,
        status = 'OPEN',
        creation_datetime = now - timedelta(days=1, hours=20),
        last_updated = now - timedelta(days=1, hours=20),
        address_from = from_address.id,
        address_to = to_address.id,
        deleted = False,
        rough_distance = 290,
        exact_distance = 240
    )
    db.session.add(move2)
    db.session.commit()

    from_address.move_id = move2.id
    to_address.move_id = move2.id
    db.session.commit()

    item2 = Item(
        name = 'Cupboard',
        weight = 50,
        volume = 10,
        amount = 1,
        description = 'Large and wooden',
        move_id = move2.id
    )
    db.session.add(item2)
    db.session.commit()

    item3 = Item(
        name = 'Table',
        weight = 20,
        volume = 10,
        amount = 1,
        description = 'Round glass table (fragile!)',
        move_id = move2.id
    )
    db.session.add(item3)
    db.session.commit()

    comment3 = Comment(
        poster=gj.id,
        parent_post=move2.id,
        creation_datetime=datetime.now() - timedelta(hours=3),
        text='Happy to help!',
        is_offer=True,
        offer_amount=350
    )
    move2.comments.append(comment3)
    db.session.commit()

    update3 = Update(
        update_type = 'offer',
        updated_movee_id = move2.movee_id,
        concerning_movee_id = gj.id,
        description='Happy to help!',
        amount=350,
        move_id = move2.id,
        update_time = datetime.now() - timedelta(hours=3)
    )
    db.session.add(update3)
    db.session.commit()

    post_record2 = PostRecord(
        move_id = move2.id,
        last_updated = datetime.now() - timedelta(hours=3),
        user_id = gj.id
    )
    gj.post_records.append(post_record2)
    db.session.commit()

    comment4 = Comment(
        poster=ml.id,
        parent_post=move2.id,
        creation_datetime=datetime.now() - timedelta(hours=2, minutes=30),
        text='Are you able to do less than that? I can\'t really afford more than $300.',
        is_offer=False,
        parent_comment = comment3.id
    )
    move2.comments.append(comment4)
    db.session.commit()

    update4 = Update(
        update_type = 'comment_reply',
        updated_movee_id = gj.id,
        concerning_movee_id = ml.id,
        description='Are you able to do less than that? I can\'t really afford more than $300.',
        move_id = move2.id,
        update_time = datetime.now() - timedelta(hours=2, minutes=30)
    )
    db.session.add(update4)
    db.session.commit()

    comment5 = Comment(
        poster=gj.id,
        parent_post=move2.id,
        creation_datetime=datetime.now() - timedelta(hours=2, minutes=15),
        text='Sorry, I would prefer not to do this job for less than $330',
        is_offer=True,
        offer_amount=330
    )
    move2.comments.append(comment5)
    db.session.commit()

    update5 = Update(
        update_type = 'offer',
        updated_movee_id = ml.id,
        concerning_movee_id = gj.id,
        description='Sorry, I would prefer not to do this job for less than $330',
        move_id = move2.id,
        update_time = datetime.now() - timedelta(hours=2, minutes=15)
    )
    db.session.add(update5)
    db.session.commit()

    comment6 = Comment(
        poster=tl.id,
        parent_post=move2.id,
        creation_datetime=datetime.now() - timedelta(hours=2, minutes=7),
        text='I\'m happy to do this job for $300',
        is_offer=True,
        offer_amount=300
    )
    move2.comments.append(comment6)
    db.session.commit()

    post_record3 = PostRecord(
        move_id = move2.id,
        last_updated = datetime.now() - timedelta(hours=2, minutes=7),
        user_id = tl.id
    )
    tl.post_records.append(post_record3)
    db.session.commit()

    update6 = Update(
        update_type = 'offer',
        updated_movee_id = move2.movee_id,
        concerning_movee_id = tl.id,
        description='I\'m happy to do this job for $300',
        amount=300,
        move_id = move2.id,
        update_time = datetime.now() - timedelta(hours=2, minutes=7)
    )
    db.session.add(update6)
    db.session.commit()

    move2.status = 'ACCEPTED'
    move2.chosen_offer = comment6.id
    db.session.commit()

    private_view1 = PrivateView(
        viewable_user = tl.id,
        viewer = move2.movee_id
    )
    db.session.add(private_view1)
    db.session.commit()

    private_view2 = PrivateView(
        viewable_user = move2.movee_id,
        viewer = tl.id
    )
    db.session.add(private_view2)
    db.session.commit()

    update_accepted1 = Update(
        update_type = 'accepted',
        updated_movee_id = tl.id,
        concerning_movee_id = move2.movee_id,
        description = '',
        move_id = move2.id,
        update_time = datetime.now() - timedelta(hours=1, minutes=43)
    )
    db.session.add(update_accepted1)
    db.session.commit()

    move2.status = 'CLOSED'
    db.session.commit()

    update_close1 = Update(
        update_type = 'close_movee',
        updated_movee_id = move2.movee_id,
        concerning_movee_id = tl.id,
        description = '',
        move_id = move2.id,
        update_time = datetime.now() - timedelta(minutes=20)
    )

    update_close2 = Update(
        update_type = 'close_removalist',
        updated_movee_id = tl.id,
        concerning_movee_id = move2.movee_id,
        description = '',
        move_id = move2.id,
        update_time = datetime.now() - timedelta(minutes=20)
    )

    db.session.add(update_close1)
    db.session.add(update_close2)
    db.session.commit()

    update_close1.update_type = 'close_movee_reviewed'
    review1 = Review(
        poster = move2.movee_id,
        reviewed_user = tl.id,
        move = move2.id,
        creation_datetime = datetime.now(),
        rating_speed = 5,
        rating_reliability = 5,
        rating_service = 4,
        review = 'Very quick. I called him expecting him to be busy for at least a week, but he was able to do my job straight away, which suited me!',
        deleted = False
    )

    tl.reviews.append(review1)
    tl.rating_overall = 5
    tl.rating_speed = 5
    tl.rating_reliability = 5
    tl.rating_service = 4
    db.session.commit()

    # MOVE 3
    from_address = FromAddress(
        line1 = '160 Coogee Bay Rd',
        line2 = '',
        city = 'Coogee',
        state = 'NSW',
        postcode = '2034'
    )
    db.session.add(from_address)

    to_address = ToAddress(
        line1 = '134 Bondi Rd',
        line2 = '',
        city = 'Bondi',
        state = 'NSW',
        postcode = '2026'
    )
    db.session.add(to_address)
    db.session.commit()

    now = datetime.now()

    move3 = MoveDetails(
        movee_id = cp.id,
        title = 'Coastal Move - Bondi',
        closing_datetime1 = datetime.now() + timedelta(days=16, hours=1, minutes=34),
        closing_datetime2 = datetime.now() + timedelta(days=16, hours=6, minutes=34),
        description = 'Moving up the coast. Need a few items moved.',
        budget = 450,
        status = 'OPEN',
        creation_datetime = now - timedelta(days=3, hours=10),
        last_updated = now - timedelta(days=3, hours=10),
        address_from = from_address.id,
        address_to = to_address.id,
        deleted = False,
        rough_distance = 4100,
        exact_distance = 4100
    )
    db.session.add(move3)
    db.session.commit()

    from_address.move_id = move3.id
    to_address.move_id = move3.id
    db.session.commit()

    item4 = Item(
        name = 'Cupboard',
        weight = 50,
        volume = 10,
        amount = 1,
        description = 'Large and wooden',
        move_id = move3.id
    )
    db.session.add(item4)
    db.session.commit()

    item5 = Item(
        name = 'Table',
        weight = 20,
        volume = 10,
        amount = 1,
        description = 'Round glass table (fragile!)',
        move_id = move3.id
    )
    db.session.add(item5)
    db.session.commit()

    item6 = Item(
        name = 'Boxes of clothes',
        weight = 5,
        volume = 3,
        amount = 4,
        description = 'Cardboard',
        move_id = move3.id
    )
    db.session.add(item6)
    db.session.commit()

    item7 = Item(
        name = 'Seats',
        weight = 4,
        volume = 3,
        amount = 6,
        description = 'Wooden, with leather cushions. Treat carefully',
        move_id = move3.id
    )
    db.session.add(item7)
    db.session.commit()


    # MOVE 4
    from_address = FromAddress(
        line1 = '42 Middle St',
        line2 = '',
        city = 'Kingsford',
        state = 'NSW',
        postcode = '2032'
    )
    db.session.add(from_address)

    to_address = ToAddress(
        line1 = '15 Green St',
        line2 = '',
        city = 'Kogarah',
        state = 'NSW',
        postcode = '2217'
    )
    db.session.add(to_address)
    db.session.commit()

    now = datetime.now()

    move4 = MoveDetails(
        movee_id = aw.id,
        title = 'Moving house fully',
        closing_datetime1 = datetime.now() + timedelta(days=19, hours=0, minutes=19),
        closing_datetime2 = datetime.now() + timedelta(days=19, hours=5, minutes=19),
        description = 'Moving house to Kogarah. Need help with a few big things',
        budget = 480,
        status = 'OPEN',
        creation_datetime = now - timedelta(days=2, hours=7, minutes=12),
        last_updated = now - timedelta(days=2, hours=7, minutes=12),
        address_from = from_address.id,
        address_to = to_address.id,
        deleted = False,
        rough_distance = 13100,
        exact_distance = 13100
    )
    db.session.add(move4)
    db.session.commit()

    from_address.move_id = move4.id
    to_address.move_id = move4.id
    db.session.commit()

    item8 = Item(
        name = 'Cupboard',
        weight = 50,
        volume = 10,
        amount = 1,
        description = 'Large and wooden',
        move_id = move4.id
    )
    db.session.add(item8)
    db.session.commit()

    item9 = Item(
        name = 'Table',
        weight = 20,
        volume = 10,
        amount = 1,
        description = 'Round glass table (fragile!)',
        move_id = move4.id
    )
    db.session.add(item9)
    db.session.commit()

    item10 = Item(
        name = 'Boxes of toys',
        weight = 5,
        volume = 3,
        amount = 4,
        description = 'Cardboard',
        move_id = move4.id
    )
    db.session.add(item10)
    db.session.commit()

    item11 = Item(
        name = 'Seats',
        weight = 4,
        volume = 3,
        amount = 6,
        description = 'Wooden, with leather cushions. Treat carefully',
        move_id = move4.id
    )
    db.session.add(item11)
    db.session.commit()

    item12 = Item(
        name = 'Bed',
        weight = 20,
        volume = 10,
        amount = 1,
        description = 'Queen Bed, including mattress and frame.',
        move_id = move4.id
    )
    db.session.add(item11)
    db.session.commit()


    # MOVE 5
    from_address = FromAddress(
        line1 = '126 Guildford Rd',
        line2 = '',
        city = 'Guildford',
        state = 'NSW',
        postcode = '2161'
    )
    db.session.add(from_address)

    to_address = ToAddress(
        line1 = '7 Paul Cl',
        line2 = '',
        city = 'Mona Vale',
        state = 'NSW',
        postcode = '2103'
    )
    db.session.add(to_address)
    db.session.commit()

    now = datetime.now()

    move5 = MoveDetails(
        movee_id = gv.id,
        title = 'Moving to the Northern Beaches',
        closing_datetime1 = datetime.now() + timedelta(days=17, hours=0, minutes=27),
        closing_datetime2 = datetime.now() + timedelta(days=17, hours=5, minutes=27),
        description = 'Quite a long move. My local removalist didn\'t want to help',
        budget = 850,
        status = 'OPEN',
        creation_datetime = now - timedelta(days=4, hours=2, minutes=52),
        last_updated = now - timedelta(days=4, hours=2, minutes=52),
        address_from = from_address.id,
        address_to = to_address.id,
        deleted = False,
        rough_distance = 46000,
        exact_distance = 46000
    )
    db.session.add(move5)
    db.session.commit()

    from_address.move_id = move5.id
    to_address.move_id = move5.id
    db.session.commit()

    item13 = Item(
        name = 'Cupboard',
        weight = 50,
        volume = 10,
        amount = 1,
        description = 'Large and wooden',
        move_id = move5.id
    )
    db.session.add(item13)
    db.session.commit()

    item14 = Item(
        name = 'Table',
        weight = 20,
        volume = 10,
        amount = 1,
        description = 'Round glass table (fragile!)',
        move_id = move5.id
    )
    db.session.add(item14)
    db.session.commit()


    # MOVE 6
    from_address = FromAddress(
        line1 = '47 Shadforth St',
        line2 = '',
        city = 'Mosman',
        state = 'NSW',
        postcode = '2088'
    )
    db.session.add(from_address)

    to_address = ToAddress(
        line1 = '8 Beaconsfield Rd',
        line2 = '',
        city = 'Mosman',
        state = 'NSW',
        postcode = '2088'
    )
    db.session.add(to_address)
    db.session.commit()

    now = datetime.now()

    move6 = MoveDetails(
        movee_id = cs.id,
        title = 'Mosman Move!',
        closing_datetime1 = datetime.now() + timedelta(days=3, hours=1, minutes=1),
        closing_datetime2 = datetime.now() + timedelta(days=3, hours=3, minutes=1),
        description = 'Heaps quick. Need this done urgently!',
        budget = 850,
        status = 'OPEN',
        creation_datetime = now - timedelta(days=1, hours=3, minutes=52),
        last_updated = now - timedelta(days=1, hours=3, minutes=52),
        address_from = from_address.id,
        address_to = to_address.id,
        deleted = False,
        rough_distance = 0,
        exact_distance = 0
    )
    db.session.add(move6)
    db.session.commit()

    from_address.move_id = move6.id
    to_address.move_id = move6.id
    db.session.commit()

    item15 = Item(
        name = 'Cupboard',
        weight = 50,
        volume = 10,
        amount = 1,
        description = 'Large and wooden',
        move_id = move6.id
    )
    db.session.add(item15)
    db.session.commit()

    item16 = Item(
        name = 'Table',
        weight = 20,
        volume = 10,
        amount = 1,
        description = 'Round glass table (fragile!)',
        move_id = move6.id
    )
    db.session.add(item16)
    db.session.commit()

    print("Initial data added.")