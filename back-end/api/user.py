from flask import abort, jsonify
from datetime import datetime
from database.model import db
from database.User import User


def get_user_by_id(user_id):
    user = db.session.query(User).filter(User.id == user_id).first()
    if user:
        resp = Response(jsonify(user.to_dict()), mimetype='application/json')
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
    query_result = db.session.query(User).filter(User.email == json['email']).first()
    if query_result:
        abort(400, 'A user with this email address already exists.')

    user = User(
        email = json['email'],
        first_name = json['firstName'],
        last_name = json['lastName'],
        user_type = json['userType'],
        password = json['hashedPassword'],
        creation_date = datetime.now()
    )
    db.session.add(user)
    db.session.commit()

    resp = jsonify({
        'success': True,
        'user': user.to_dict()
    })
    resp.status_code = 200

    return resp


def authenticate_login(email):
    resp = jsonify({
        'success': True,
        'hashed_password': get_hashed_password(email)
    })
    resp.status_code = 200
    return resp


def get_hashed_password(email):
    query_result = db.session.query(User).filter(User.email == email).first()
    if not query_result:
        return ''
    else:
        return query_result.password