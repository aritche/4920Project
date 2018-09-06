import json

def get_accommodations_list():
    # Placeholder while database is not set up
    hardcoded_accommodations = [
        {
            'id': 1,
            'university': 'UNSW',
            'name': 'New College',
        },
        {
            'id': 2,
            'university': 'UNSW',
            'name': 'UNSW Village'
        }
    ]
    return json.dumps(hardcoded_accommodations)