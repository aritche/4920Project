from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def init_app(app):
    # Disable track modifications, as it unnecessarily uses memory.
    app.config.setdefault('SQLALCHEMY_TRACK_MODIFICATIONS', False)
    db.init_app(app)


def _create_database():
    """
    If this script is run directly, create all the tables necessary to run the
    application.
    """
    app = Flask(__name__)
    app.config.from_pyfile('../config.py')
    init_app(app)
    with app.app_context():
        db.create_all()
    print("All tables created")

if __name__ == '__main__':
    _create_database()


# def from_sql(row):
#     """Translates a SQLAlchemy model instance into a dictionary"""
#     data = row.__dict__.copy()
#     data['id'] = row.id
#     data.pop('_sa_instance_state')
#     return data

# # [START list]
# def list_items(limit=10, cursor=None):
#     cursor = int(cursor) if cursor else 0
#     query = (College.query
#              .order_by(College.title)
#              .limit(limit)
#              .offset(cursor))
#     colleges = list(map(from_sql, query.all()))
#     next_page = cursor + limit if len(colleges) == limit else None
#     return (colleges, next_page)
# # [END list]

# [START read]
# def read(id):
#     result = College.query.get(id)
#     if not result:
#         return None
#     return from_sql(result)
# # [END read]

# [START create]
# def create(data):
#     college = College(**data)
#     db.session.add(college)
#     db.session.commit()
#     return from_sql(college)
# # [END create]

# # [START update]
# def update(data, id):
#     college = College.query.get(id)
#     for k, v in data.items():
#         setattr(college, k, v)
#     db.session.commit()
#     return from_sql(college)
# # [END update]

# def delete(id):
#     College.query.filter_by(id=id).delete()
#     db.session.commit()