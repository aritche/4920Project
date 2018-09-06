import json

def get_user_by_id(user_id):
    # Placeholder while database is not set up
    hardcoded_user = {
        'user_id': 123,
        'email': 'john.smith@example.com',
        'first_name': 'John',
        'last_name': 'Smith',
        'university': 'UNSW',
        'DOB': '21/03/1995'
    }
    return json.dumps(hardcoded_user)