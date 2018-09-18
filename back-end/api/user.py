from flask import abort, jsonify
from datetime import datetime
from database.model import db
from database.User import User


def get_user_by_id(user_id):
    user = db.session.query(User).filter(User.id == user_id).first()
    if user:
        resp = Response(jsonify(user.to_dict()), mimetype='application/json')
        resp.status_code = 200
        resp.headers['Access-Control-Allow-Origin'] = '*'
    else:
        abort(400, 'No user with this id exists.')
    return resp


def insert_new_user(json):
    if (
        not json
        or (not 'firstName' in json)
        or (not 'lastName' in json)
        or (not 'email' in json)
        or (not 'hashedPassword' in json)
    ):
        abort(400, 'Not all fields were received.')

    attempt_add = User.add_user(
        json['email'],
        json['firstName'],
        json['lastName'],
        json['userType'],
        json['hashedPassword']
    )

    if not attempt_add.success:
        abort(400, attempt_add.error)


    resp = jsonify({
        'success': True,
        'user': User.to_dict(attempt_add.user)
    })
    resp.status_code = 200
    resp.headers['Access-Control-Allow-Origin'] = '*'

    return resp