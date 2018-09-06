from flask import Flask
from config import Config
from api import base
import database

app = database.create_app(Config)

app.register_blueprint(base, url_prefix='/api')

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)