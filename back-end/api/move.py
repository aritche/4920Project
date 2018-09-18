from flask import abort, jsonify
from datetime import datetime
from database.model import db
from database.MoveDetails import MoveDetails
from database.FromAddress import FromAddress
from database.ToAddress import ToAddress
from database.Item import Item

def create_new_move(json):
    if (
        not json
        or (not 'title' in json)
        or (not 'addrFromL1' in json)
        or (not 'addrFromL2' in json)
        or (not 'fromState' in json)
        or (not 'fromPostCo' in json)
        or (not 'addrToL1' in json)
        or (not 'addrToL2' in json)
        or (not 'toState' in json)
        or (not 'toPostCo' in json)
        or (not 'date' in json)
        or (not 'time1' in json)
        or (not 'time2' in json)
        or (not 'budget' in json)
        or (not 'desc' in json)
        or (not 'items' in json)
        or (not 'userId' in json)
    ):
        abort(400, 'Not all fields were received.')

    print(json['date'])
    print(json['time1'])
    print(json['time2'])
    abort(400, 'For now')

    # create addresses
    address_from = FromAddress(
        line1 = json['addrFromL1'],
        line2 = json['addrFromL2'],
        state = json['fromState'],
        postcode = json['fromPostCo']
    )
    address_to = ToAddress(
        line1 = json['addrToL1'],
        line2 = json['addrToL2'],
        state = json['toState'],
        postcode = json['toPostCo']
    )
    db.session.add(address_from, address_to)
    db.session.commit()

    # create move details
    move = MoveDetails(
        movee_id = json['userId'],
        title = json['title'],
        closing_date = datetime.now(), # placeholder
        description = json['desc'],
        budget = json['budget'],
        status = 'OPEN',
        creation_datetime = datetime.now(),
        address_from = address_from.id,
        address_to = address_to.id
    )
    db.session.add(move)
    db.session.commit()

    # create items
    for item in json['items']:
        new_item = Item(
            name = item['name'],
            weight = item['weight'],
            volume = item['volume'],
            amount = item['amount'],
            move_id = move.id
        )
        db.session.add(new_item)

    # update addresses with move id
    address_from.move_id = move.id
    address_to.move_id = move.id
    db.session.commit()

    resp = jsonify({
        'success': True,
        'move': move.to_dict()
    })
    resp.status_code = 200

    return resp