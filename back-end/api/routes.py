from api import base
from api.user import get_user_by_id
from api.accommodations import get_accommodations_list
import json
from database.model import db
from database.College import College


@base.route('/user/<user_id>')
def get_user(user_id):
    return get_user_by_id(user_id)

@base.route('/accommodations')
def get_accommodations():
    return get_accommodations_list()

@base.route('/db_test_read')
def test_read():
    query = College.query.order_by(College.id)
    colleges = list(map(College.to_dict, query.all()))
    return json.dumps(colleges)

@base.route('/db_test_write')
def test_write():
    college = College(name='Baxter College')
    db.session.add(college)
    db.session.commit()
    print("hello4")
    return json.dumps(College.to_dict(college))