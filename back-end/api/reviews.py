from flask import abort, jsonify
from datetime import datetime
from database.model import db
from database.User import User
from database.MoveDetails import MoveDetails
from database.Reviews import Reviews
from sqlalchemy import and_, not_


def insert_new_review(json):
    if (
        not json
        or (not 'poster' in json)
        or (not 'reviewedUser' in json)
        or (not 'move' in json)
        or (not 'creationDate' in json)
        or (not 'review' in json)
        or (not 'rating' in json)
    ):
        abort(400, 'Not all fields were received.')

    # Validate Poster and Reviewed User are both not the same type of user

    # query_result = db.session.query(User).filter(and_(User.email == json['email'], not User.deleted)).first()
    # if query_result:
    #     abort(400, 'A user with this email address already exists.')
    # query_result = db.session.query(User).filter(and_(User.user_type == json['poster'], not (User.id == json[])))

    # Validate poster and reviewed user are real
    query_poster = db.session.query(User).filter(User.id == json['poster']).first()
    query_reviewedUser = db.session.query(User).filter(User.id == json['reviewedUser']).first()
    if not query_poster and not query_reviewedUser:
    	abort(400, 'Invalid review, poster and reviewed user do not exist')
    elif not query_poster:
    	abort(400, 'Invalid review, poster do not exist')
    if not query_reviewedUser:
    	abort(400, 'Invalid review, reviewed user do not exist')

    # Validate Poster and Reviewed User are both in database
    if json['poster'] == json['reviewedUser']:
    	abort(400, 'Invalid review, poster and reviewed user cannot be the same')

    # Validate move exists
    query_result = db.session.query(MoveDetails).filter(MoveDetails.id == json['move']).first()
    if not query_result:
    	abort(400, 'Move does not exist')

    review = review(
        poster = json['poster'],
        reviewedUser = json['reviewedUser'],
        move = json['move'],
        creationDate = datetime.now(),
        review = json['review'],
        rating = json['rating'],
    )
    
    db.session.add(review)
    db.session.commit()

    resp = jsonify({
        'success': True,
        'user': user.to_dict()
    })
    resp.status_code = 200

    return resp

def remove_review(json):
    if json and 'review_id' in json:
        id_to_delete = json['reviewId']
    else:
        abort(400, 'Not all required fields were received.')

    review_to_delete = db.session.query(Reviews).filter(and_(Reviews.id == id_to_delete, not_(Reviews.deleted))).first()

    if not review_to_delete:
        abort(400, 'Review not found.')
    else:
        review_to_delete.deleted = True
        db.session.commit()
        resp = jsonify({
            'success': True,
        })
        resp.status_code = 200

        return resp
