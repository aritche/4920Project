from flask import abort, jsonify
from datetime import datetime
from database.model import db
from database.User import User
from database.MoveDetails import MoveDetails
from database.Review import Review
from sqlalchemy import and_, not_

def insert_new_movee_review(json):
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

    # Validate Poster and Reviewed User are both in database
    if json['poster'] == json['reviewedUser']:
        abort(400, 'Invalid review, poster and reviewed user cannot be the same')

    # Validate Poster and Reviewed User are both not the same type of user

    # Validate poster and reviewed user are real
    query_poster = db.session.query(User).filter(User.id == json['poster']).first()
    query_reviewedUser = db.session.query(User).filter(User.id == json['reviewedUser']).first()
    if not query_poster and not query_reviewedUser:
    	abort(400, 'Invalid review, poster and reviewed user do not exist')
    elif not query_poster:
    	abort(400, 'Invalid review, poster do not exist')
    if not query_reviewedUser:
    	abort(400, 'Invalid review, reviewed user do not exist')

    # Validate move exists
    query_result = db.session.query(MoveDetails).filter(MoveDetails.id == json['move']).first()
    if not query_result:
    	abort(400, 'Move does not exist')

    review = Review(
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

    review_to_delete = db.session.query(Review).filter(and_(Review.id == id_to_delete, not_(Review.deleted))).first()

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

def get_average_rating(id):
    # query_result = db.session.query(User).filter(User.id == json['id']).first()
    user_type = db.session.select([User.user_type]).where(User.id == id)
    print(user_type)
    print(type(user_type))
    if user_type == "Movee":
        list_of_ratings = db.session.query([Review.rating]).filter(Review.reviewedUser == id).all()
        sum_of_ratings = 0
        for item in list_of_ratings:
            sum_of_ratings += item
        average_rating = sum_of_ratings/len(list_of_ratings)
    return average_rating








