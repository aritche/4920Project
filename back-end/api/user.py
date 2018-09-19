from flask import abort, jsonify
from datetime import datetime
from database.model import db
from database.User import User


def get_user_by_id(user_id):
    user = db.session.query(User).filter(User.id == user_id).first()
    if user:
        resp = jsonify(user.to_dict())
        resp.status_code = 200
    else:
        abort(400, 'No user with this id exists.')
    return resp


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

    # validate names?

    # Check for account with same email
    query_result = db.session.query(User).filter(User.email == json['email'] and not User.deleted).first()
    if query_result:
        abort(400, 'A user with this email address already exists.')

    user = User(
        email = json['email'],
        first_name = json['firstName'],
        last_name = json['lastName'],
        user_type = json['userType'],
        password = json['hashedPassword'],
        creation_date = datetime.now(),
        deleted = False
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


    account_to_delete = db.session.query(User).filter(User.id == id_to_delete).first()

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

    user = db.session.query(User).filter(User.email == json['email'] and not User.deleted).first()
    if not user or user.deleted:
        password = ''
        user_id = -1
    else:
        password = user.password
        user_id = user.id

    resp = jsonify({
        'success': True,
        'hashed_password': password,
        'user_id': user_id
    })
    resp.status_code = 200
    return resp
