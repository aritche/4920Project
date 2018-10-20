from flask import abort, jsonify
from datetime import datetime
from database.model import db
from database.User import User
from database.MoveDetails import MoveDetails
from database.Review import Review
from sqlalchemy import and_, not_

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
    query_reviewedUser = db.session.query(User).filter(User.id == json['reviewedUser']).first()
    if not query_poster and not query_reviewedUser:
        abort(400, 'Invalid review, poster and reviewed user do not exist')
    elif not query_poster:
        abort(400, 'Invalid review, poster do not exist')
    if not query_reviewedUser:
        abort(400, 'Invalid review, reviewed user do not exist')

    # Validate Poster is removalist
    if query_poster.user_type != 'Removalist':
        abort(400, 'Poster must be a removalist')

    review = Review(
        poster = json['poster'],
        # reviewed_user = json['reviewedUser'],
        move = json['move'],
        creation_datetime = datetime.now(),
        rating_general = json['ratingGeneral'],
        review = json['review'],
        deleted = False
    )
    
    # query_reviewedUser.reviews.append(review)
    db.session.add(review)
    db.session.commit()

    resp = jsonify({
        'success': True,
        'user': user.to_dict()
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

    # Validate poster is movee


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
    
    db.session.add(review)
    db.session.commit()

    resp = jsonify({
        'success': True,
        'review': review.to_dict()
    })
    resp.status_code = 200

    return resp

def list_all_reviews(user_id):
    query = db.session.query(User).filter(User.id == user_id).first()
    if not query:
        abort(400, 'No user found')
        
    resp = jsonify({
        'reviews': list(map(Review.to_dict, query.reviews))
    })
    resp.status_code = 200
    
  
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

def get_user_ratings(userId):

    user = db.session.query(User).filter(and_(User.id == json['userId'], not_(User.deleted))).first()
    if not user:
        abort(400, 'User with given userId does not exist.')

    user_type = db.session.select([User.user_type]).where(User.userId == userId).first()

    if user_type == "Movee":
        overall = get_average_rating(userId, 'rating_general')
        rating_speed = 0
        rating_service = 0
        rating_reliability = 0
    elif user_type == "Removalist":
        rating_speed = get_average_rating(userId, 'rating_speed')
        rating_service = get_average_rating(userId, 'rating_service')
        rating_reliability = get_average_rating(userId, 'rating_reliability')
        overall = int(round(float(rating_speed + rating_service + rating_reliability) / 3.0))

    resp = jsonify({
        'success': True,
        'overall': overall,
        'rating_reliability': rating_reliability,
        'rating_service': rating_service,
        'rating_speed': rating_speed
    })
    resp.status_code = 200
    return resp

def get_average_rating(userId, rating_to_fetch):
    # query_result = db.session.query(User).filter(User.userId == json['userId']).first()
    user_type = db.session.select([User.user_type]).where(User.userId == userId).first()
    # print(user_type)
    # print(type(user_type))
    # average_rating = 0
    # list_of_ratings = []
    average = 0

    if user_type == "Movee":
        # list_of_ratings = db.session.query([Review.rating_general]).filter(and_(Review.reviewed_user == id, not_(Review.deleted))).all()   
        average = db.session.query(func.avg(Review.rating_general)).filter(and_(Review.reviewed_user == userId), not_(Rating.deleted))
    elif user_type == "Removalist":
        if rating_to_fetch == "rating_speed":
            average = db.session.query(func.avg(Review.rating_speed)).filter(and_(Review.reviewed_user == userId), not_(Rating.deleted))
            # list_of_ratings = db.session.query([Review.rating_speed]).filter(and_(Review.reviewed_user == id, not_(Review.deleted))).all()   
        elif rating_to_fetch == "rating_service":
            average = db.session.query(func.avg(Review.rating_service)).filter(and_(Review.reviewed_user == userId), not_(Rating.deleted))
            # list_of_ratings = db.session.query([Review.rating_service]).filter(and_(Review.reviewed_user == id, not_(Review.deleted))).all()   
        elif rating_to_fetch == "rating_reliability":
            # list_of_ratings = db.session.query([Review.rating_reliability]).filter(and_(Review.reviewed_user == id, not_(Review.deleted))).all()   
            average = db.session.query(func.avg(Review.rating_reliability)).filter(and_(Review.reviewed_user == userId), not_(Rating.deleted))

    # sum_of_ratings = 0
    # for item in list_of_ratings:
    #     sum_of_ratings += item
    # average_rating = sum_of_ratings/len(list_of_ratings)

    return average