from flask import Blueprint
from api.config import Config

base = Blueprint('api', __name__)

from api import routes