from flask import Blueprint

base = Blueprint('api', __name__)

from api import routes
from api import error_handler