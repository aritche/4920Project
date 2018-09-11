import logging
from flask import current_app, Flask, redirect, url_for
import database.model as model

db = SQLAlchemy()

def create_app(config, debug=False, testing=False, config_overrides=None):
    app = Flask(__name__)
    app.config.from_object(config)

    if config_overrides:
        app.config.update(config_overrides)

    # Configure logging
    if not app.testing:
        logging.basicConfig(level=logging.INFO)

    # Setup the data model.
    with app.app_context():
        app.config.setdefault('SQLALCHEMY_TRACK_MODIFICATIONS', False)
        db.init_app(app)

    return app