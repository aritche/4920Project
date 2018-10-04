from flask import abort, jsonify
from database.model import db
from database.User import User
from database.MoveDetails import MoveDetails


def add_comment(json):
    if (
        not json
        or not ('postId' in json)
        or not ('parentComment')
    ):
        abort(400, 'Not all fields were received.')

    resp = jsonify({

    })
    resp.status_code = 200
    return resp