from flask import abort, jsonify
from datetime import datetime
from database.model import db
from database.User import User
from database.MoveDetails import MoveDetails
from database.Update import Update
from database.PrivateView import PrivateView
from database.PostRecord import PostRecord
from database.Review import Review
from sqlalchemy import and_, not_


def get_user_by_id(user_id):
    user = db.session.query(User).filter(User.id == user_id).first()
    if user:
        resp = jsonify(decorate_user(user))
        resp.status_code = 200
    else:
        abort(400, 'No user with this id exists.')
    return resp


def decorate_user(user):
    user_dict = user.to_dict()
    user_dict['posts'] = list(map(MoveDetails.to_dict, db.session.query(MoveDetails).filter(and_(MoveDetails.movee_id == user.id, not_(MoveDetails.deleted))).all()))
    user_dict['joined_in'] = user.creation_date.strftime('%B %Y')
    user_dict['updates'] = list(map(decorate_update, map(
        Update.to_dict,
        db.session.query(Update).filter(Update.updated_movee_id == user.id).order_by(Update.update_time.desc()).all()
    )))
    user_dict['viewable'] = list(map(PrivateView.get_viewer, db.session.query(PrivateView).filter(PrivateView.viewable_user == user.id).all()))
    user_dict['post_records'] = list(map(decorate_post_record, sorted(db.session.query(PostRecord).filter(PostRecord.user_id == user.id).all(), key=lambda x: db.session.query(MoveDetails).filter(MoveDetails.id == x.move_id).first().closing_datetime1)))
    user_dict['reviews'] = list(map(decorate_review, user.reviews))
    return user_dict


def decorate_review(review):
    print(review.to_dict())
    review_dict = {}
    reviewer = db.session.query(User).filter(and_(User.id == review.poster, not_(User.deleted))).first()
    if not reviewer:
        review_dict['reviewer'] = {
            'name': '[Deleted]',
            'avatar': 'default'
        }
    else:
        review_dict['reviewer'] = {
            'id': review.poster,
            'name': reviewer.first_name + ' ' + reviewer.last_name,
            'avatar': reviewer.avatar
        }
    review_dict['rating_general'] = review.rating_general
    review_dict['rating_speed'] = review.rating_speed
    review_dict['rating_reliability'] = review.rating_reliability
    review_dict['rating_service'] = review.rating_service
    review_dict['review'] = review.review
    review_dict['date'] = review.creation_datetime.strftime('%-d %B %y')

    return review_dict


def decorate_post_record(post_record):
    record_dict = {}
    move_query = db.session.query(MoveDetails).filter(MoveDetails.id == post_record.move_id).first()
    record_dict['id'] = post_record.id
    record_dict['name'] = move_query.title
    record_dict['closing_datetime'] = move_query.closing_datetime1
    record_dict['status'] = move_query.status
    record_dict['move_id'] = move_query.id
    return record_dict


def decorate_update(update):
    user = db.session.query(User).filter(and_(User.id == update['concerning'], not_(User.deleted))).first()
    if not user:
        update['concerning_details'] = {
            'id': -1,
            'avatar': 'default',
            'first_name': '[Deleted]',
            'last_name': '',
        }
    else:
        update['concerning_details'] = user.to_dict()

    if update['update_type'] == 'comment':
        update['event'] = 'commented on your move'
    elif update['update_type'] == 'offer':
        update['event'] = 'made an offer on your move'
    elif update['update_type'] == 'accepted':
        update['event'] = ' has accepted your offer'
    elif update['update_type'] == 'close_movee' or update['update_type'] == 'close_movee_reviewed':
        update['event'] = ' have marked your move as closed'
    elif update['update_type'] == 'close_removalist' or update['update_type'] == 'close_removalist_reviewed':
        update['event'] = ' has marked your move as closed'
    elif update['update_type'] == 'comment_reply':
        update['event'] = ' has replied to your comment'
    elif update['update_type'] == 'post_update':
        update['event'] = ' has edited the details of their move'
    else:
        update['event'] = update['update_type']
    update['update_time_string'] = update['update_time'].strftime('%-I:%M %p on %d %B, %Y')

    return update


def validate_email(email):
    # need to add in more validation rules
    if not '@' in email:
        return False
    return True


def insert_new_user(json):
    if (
        not json
        or (not 'firstName' in json)
        or (not 'lastName' in json)
        or (not 'email' in json)
        or (not 'hashedPassword' in json)
        or (not 'userType' in json)
    ):
        abort(400, 'Not all fields were received.')

    if not validate_email(json['email']):
        abort(400, 'The email address is invalid.')

    query_result = db.session.query(User).filter(and_(User.email == json['email'], not_(User.deleted))).first()
    if query_result:
        abort(400, 'A user with this email address already exists.')

    user = User(
        email = json['email'],
        first_name = json['firstName'],
        last_name = json['lastName'],
        user_type = json['userType'],
        password = json['hashedPassword'],
        creation_date = datetime.now(),
        deleted = False,
        description = '',
        phone_number = '',
        avatar = 'default'
    )
    db.session.add(user)
    db.session.commit()

    resp = jsonify({
        'success': True,
        'user': user.to_dict()
    })
    resp.status_code = 200

    return resp


def delete_user(json):
    if json and 'userId' in json:
        id_to_delete = json['userId']
    else:
        abort(400, 'Not all required fields were received.')


    account_to_delete = db.session.query(User).filter(and_(User.id == id_to_delete, not_(User.deleted))).first()

    if not account_to_delete:
        abort(400, 'Account not found.')
    else:
        account_to_delete.deleted = True
        db.session.commit()
        resp = jsonify({
            'success': True,
        })
        resp.status_code = 200

        return resp


def authenticate_login(json):
    if not 'email' in json:
        abort(400, 'No email received.')

    user = db.session.query(User).filter(and_(User.email == json['email'], not_(User.deleted))).first()

    if not user:
        password = ''
        user_id = -1
        user_type = ''
    else:
        password = user.password
        user_id = user.id
        user_type = user.user_type

    resp = jsonify({
        'success': True,
        'hashed_password': password,
        'user_id': user_id,
        'user_type': user_type
    })
    resp.status_code = 200
    return resp


def update_user(json):
    if (
        not json
        or (not 'userId' in json)
        or (not 'avatar' in json)
        or (not 'firstName' in json)
        or (not 'lastName' in json)
        or (not 'email' in json)
        or (not 'phoneNumber' in json)
        or (not 'description' in json)
    ):
        abort(400, 'Not all required fields were received.')

    user = db.session.query(User).filter(and_(User.id == json['userId'], not_(User.deleted))).first()
    if not user:
        abort(400, 'User with given userId does not exist.')

    user.avatar = json['avatar']
    user.first_name = json['firstName']
    user.last_name = json['lastName']
    user.email = json['email']
    user.phone_number = json['phoneNumber']
    user.description = json['description']

    db.session.commit()

    resp = jsonify({
        'success': True
    })
    resp.status_code = 200
    return resp


def delete_post_record(json):
    if (
        not json
        or (not 'postRecordId' in json)
    ):
        abort(400, 'Not all required fields were received.')

    post_record = db.session.query(PostRecord).filter(PostRecord.id == json['postRecordId']).first()
    if not post_record:
        abort(400, 'PostRecord could not be found.')

    db.session.delete(post_record)
    db.session.commit()

    resp = jsonify({
        'success': True
    })
    resp.status_code = 200
    return resp


def get_top_removalists():

    # order by rating once reviews is implemented
    removalists = db.session.query(User).filter(and_(User.user_type == 'Removalist', not_(User.deleted), User.rating_overall != 0)).order_by(User.rating_overall).limit(6).all()

    resp = jsonify(list(map(User.to_dict, removalists)))
    resp.status_code = 200
    return resp