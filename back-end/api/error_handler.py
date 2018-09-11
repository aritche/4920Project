from flask import jsonify
from api import base


@base.errorhandler(400)
def custom400(error):
    resp = jsonify({'error': error.description})
    resp.status_code = 400
    return resp

@base.errorhandler(500)
def custom500(error):
    resp = jsonify({'error': 'internal server error'})
    resp.status_code = 500
    return resp