from flask import request
from flask_cors import cross_origin
from api import base
from api.comment import add_comment, add_offer
from api.user import (
    authenticate_login, get_user_by_id, insert_new_user, delete_user,
    update_user, delete_post_record, get_top_removalists
)
from api.move import (
    create_new_move, get_move_details, search_moves, delete_move_details,
    mark_move_as_accepted, close_move
)

from api.reviews import (
    insert_review, get_user_ratings, list_all_reviews
)


@base.route('/user/<user_id>')
def get_user(user_id):
    return get_user_by_id(user_id)

@base.route('/user', methods=['POST'])
def new_user():
    return insert_new_user(request.json)

@base.route('/authenticate', methods=['POST'])
def authenticate_user():
    return authenticate_login(request.json)

@base.route('/create-post', methods=['POST'])
def create_post():
    return create_new_move(request.json)

@base.route('/search-posts', methods=['POST'])
def search_posts():
    return search_moves(request.json)

@base.route('/delete-post', methods=['POST'])
def delete_post():
    return delete_move_details(request.json)

@base.route('/delete-account', methods=['POST'])
def delete_account():
    return delete_user(request.json)

@base.route('/post/<post_id>')
def get_post(post_id):
    return get_move_details(post_id)

@base.route('/post-comment', methods=['POST'])
def post_comment():
    return add_comment(request.json)

@base.route('/insert-offer', methods=['POST'])
def insert_offer():
    return add_offer(request.json)

@base.route('/accept-offer', methods=['POST'])
def accept_offer():
    return mark_move_as_accepted(request.json)

@base.route('/edit-account', methods=['POST'])
def edit_account():
    return update_user(request.json)

@base.route('/close-post', methods=['POST'])
def close_post():
    return close_move(request.json)

@base.route('/submit-review', methods=['POST'])
def submit_review():
    return insert_review(request.json)

@base.route('/remove-post-record', methods=['POST'])
def remove_post_record():
    return delete_post_record(request.json)

@base.route('/recommended-removalists')
def recommended_removalists():
    return get_top_removalists()
