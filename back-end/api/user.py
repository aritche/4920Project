from flask import abort, jsonify
from datetime import datetime
from database.model import db
from database.User import User
from database.MoveDetails import MoveDetails
from database.Update import Update
from database.PrivateView import PrivateView
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
    return user_dict


def decorate_update(update):
    update['concerning_details'] = db.session.query(User).filter(User.id == update['concerning']).first().to_dict()
    if update['update_type'] == 'comment':
        update['event'] = 'commented on your post'
    elif update['update_type'] == 'offer':
        update['event'] = 'made an offer on your post'
    elif update['update_type'] == 'accepted':
        update['event'] = ' has accepted your offer'
    elif update['update_type'] == 'close_movee':
        update['event'] = ' have marked your move as closed'
    elif update['update_type'] == 'close_removalist':
        update['event'] = ' has marked your move as closed'
    elif update['update_type'] == 'comment_reply':
        update['event'] = ' has replied to your comment'
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