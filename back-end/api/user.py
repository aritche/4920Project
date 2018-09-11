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


def insert_new_user(json):
    if (
        not json
        or (not 'firstName' in json)
        or (not 'lastName' in json)
        or (not 'email' in json)
        or (not 'confirmEmail' in json)
        or (not 'password' in json)
        or (not 'dateOfBirth' in json)
    ):
        abort(400, 'Not all fields were received.')

    # Verify information
    if len(json['password']) < 6:
        abort(400, 'Password is must be at least 6 characters long.')
    if json['email'] != json['confirmEmail']:
        abort(400, 'Email addresses do not match.')
    # TODO: verify date of birth

    # Check for account with same email
    query_result = db.session.query(User).filter(User.email == json['email']).first()
    if query_result:
        abort(400, 'An account with that email address already exists.')

    user = User(
        email = json['email'],
        first_name = json['firstName'],
        last_name = json['lastName'],
        password = json['password'],
        date_of_birth = datetime.strptime(json['dateOfBirth'], '%Y-%m-%d')
    )
    db.session.add(user)
    db.session.commit()

    resp = jsonify({
        'success': True,
        'user': User.to_dict(user)
    })
    resp.status_code = 200
    return resp