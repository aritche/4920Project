from flask import abort, jsonify
from datetime import datetime
from database.model import db
from database.MoveDetails import MoveDetails

def create_new_move(json):
    if (
        not json
        or (not 'title' in json)
        or (not 'addrFromL1' in json)
        or (not 'addrFromL2' in json)
        or (not 'fromState' in json)
        or (not 'fromPostCo' in json)
        or (not 'addrToL1' in json)
        or (not 'addrToL2' in json)
        or (not 'toState' in json)
        or (not 'toPostCo' in json)
        or (not 'date' in json)
        or (not 'time1' in json)
        or (not 'time2' in json)
        or (not 'budget' in json)
        or (not 'desc' in json)
        or (not 'items' in json)
        or (not 'userId' in json)
    ):
        abort(400, 'Not all fields were received.')


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