from flask import Flask
from config import Config
from api import base
from database.model import db
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app)

from database.ToAddress import ToAddress
from database.FromAddress import FromAddress
from database.Comment import Comment
from database.Item import Item
from database.MoveDetails import MoveDetails
from database.User import User
from database.Review import Review
from database.PrivateView import PrivateView
from database.Distances import Distances
from database.Postcode import Postcode
from database.PostRecord import PostRecord

db.init_app(app)
app.register_blueprint(base, url_prefix='/api')

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)