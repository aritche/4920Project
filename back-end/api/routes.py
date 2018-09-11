from api import base
from flask import request
from api.user import get_user_by_id, insert_new_user


@base.route('/user/<user_id>')
def get_user(user_id):
    return get_user_by_id(user_id)

@base.route('/user', methods=['POST'])
def new_user():
    return insert_new_user(request.json)
