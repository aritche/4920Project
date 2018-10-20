from flask import abort, jsonify
from datetime import datetime
from database.model import db
from database.User import User
from database.MoveDetails import MoveDetails
from database.Review import Review
from sqlalchemy import and_, not_
from sqlalchemy.sql import func

def insert_review(json):
    if (
        not json
        or (not 'poster' in json)
        or (not 'reviewedUser' in json)
        or (not 'move' in json)
        or (not 'review' in json)
    ):
        abort(400, 'Not all fields were received')

    # Validate move jobs
    # query_result = db.session.query(MoveDetails).filter(MoveDetails.id == json['move']).first()
    # if not query_result and query_result.status == 'CLOSED':
    #     abort(400, 'Closed move does not exist')

    # Validate Poster and Reviewed User are not the same
    if json['poster'] == json['reviewedUser']:
        abort(400, 'Invalid review, poster and reviewed user cannot be the same')

    # query database to get user type
    query_result = db.session.query(User).filter(User.id == json['reviewedUser']).first()
    # if not query_result:
    #     abort(400, 'Move does not exist')

    if query_result.user_type == 'Removalist':
        return insert_new_review_for_removalist(json)
    elif query_result.user_type == 'Movee':
        return insert_new_review_for_movee(json)


def insert_new_review_for_movee(json):
    if not 'ratingGeneral' in json:
        abort(400, 'No rating was received.')

    # Validate poster and reviewed user are real
    query_poster = db.session.query(User).filter(User.id == json['poster']).first()
    query_reviewed_user = db.session.query(User).filter(User.id == json['reviewedUser']).first()
    if not query_poster and not query_reviewed_user:
        abort(400, 'Invalid review, poster and reviewed user do not exist')
    elif not query_poster:
        abort(400, 'Invalid review, poster do not exist')
    if not query_reviewed_user:
        abort(400, 'Invalid review, reviewed user do not exist')

    # Validate Poster is removalist
    if query_poster.user_type != 'Removalist':
        abort(400, 'Poster must be a removalist')

    review = Review(
        poster = json['poster'],
        reviewed_user = json['reviewedUser'],
        move = json['move'],
        creation_datetime = datetime.now(),
        rating_general = json['ratingGeneral'],
        review = json['review'],
        deleted = False
    )

    query_reviewed_user.reviews.append(review)
    db.session.commit()

    update_user_ratings(json['reviewedUser'])

    resp = jsonify({
        'success': True,
        'review': review.to_dict()
    })
    resp.status_code = 200

    return resp

def insert_new_review_for_removalist(json):
    if (
        not json
        or (not 'ratingService' in json)
        or (not 'ratingReliability' in json)
        or (not 'ratingSpeed' in json)
    ):
        abort(400, 'Not all fields were received.')

    # Validate Poster and Reviewed User are both in database
    if json['poster'] == json['reviewedUser']:
        abort(400, 'Invalid review, poster and reviewed user cannot be the same')

    # Validate poster and reviewed user are real
    query_poster = db.session.query(User).filter(User.id == json['poster']).first()
    query_reviewed_user = db.session.query(User).filter(User.id == json['reviewedUser']).first()
    if not query_poster and not query_reviewed_user:
        abort(400, 'Invalid review, poster and reviewed user do not exist')
    elif not query_poster:
        abort(400, 'Invalid review, poster do not exist')
    if not query_reviewed_user:
        abort(400, 'Invalid review, reviewed user do not exist')

    # Validate move exists
    # query_result = db.session.query(MoveDetails).filter(MoveDetails.id == json['move']).first()
    # if not query_result:
    #     abort(400, 'Move does not exist')

    review = Review(
        poster = json['poster'],
        reviewed_user = json['reviewedUser'],
        move = json['move'],
        creation_datetime = datetime.now(),
        rating_speed = json['ratingSpeed'],
        rating_reliability = json['ratingReliability'],
        rating_service = json['ratingService'],
        review = json['review'],
        deleted = False
    )

    query_reviewed_user.reviews.append(review)
    db.session.commit()

    update_user_ratings(json['reviewedUser'])

    resp = jsonify({
        'success': True,
    })
    resp.status_code = 200

    return resp


def update_user_ratings(userId):
    user = db.session.query(User).filter(and_(User.id == userId, not_(User.deleted))).first()
    if not user:
        return False

    if user.user_type == "Movee":
        user.rating_overall = int(round(db.session.query(func.avg(Review.rating_general)).filter(Review.reviewed_user == userId).scalar()))
    elif user.user_type == "Removalist":
        user.rating_speed = int(round(db.session.query(func.avg(Review.rating_speed)).filter(Review.reviewed_user == userId).scalar()))
        user.rating_service = int(round(db.session.query(func.avg(Review.rating_service)).filter(Review.reviewed_user == userId).scalar()))
        user.rating_reliability = int(round(db.session.query(func.avg(Review.rating_reliability)).filter(Review.reviewed_user == userId).scalar()))
        user.rating_overall = int(round(float(user.rating_speed + user.rating_service + user.rating_reliability) / 3.0))

    db.session.commit()

    return True