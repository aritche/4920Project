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

from database.Address import Address
from database.Comment import Comment
from database.Item import Item
from database.MoveDetails import MoveDetails
from database.User import User

db.init_app(app)
app.register_blueprint(base, url_prefix='/api')

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)