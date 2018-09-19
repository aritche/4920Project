from flask import abort, jsonify
from datetime import datetime
from database.model import db
from database.MoveDetails import MoveDetails
from database.FromAddress import FromAddress
from database.ToAddress import ToAddress
from database.Item import Item
from database.User import User


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
        or (not 'userId' in json)       # not sure, backend should be implementing id generation
    ):
        abort(400, 'Not all fields were received.')

    if json['userId'] == -1:
        abort(400, 'You must be logged in to create a post.')

    # create addresses
    address_from = FromAddress(
        line1 = json['addrFromL1'],
        line2 = json['addrFromL2'],
        state = json['fromState'],
        postcode = json['fromPostCo']
    )
    db.session.add(address_from)

    address_to = ToAddress(
        line1 = json['addrToL1'],
        line2 = json['addrToL2'],
        state = json['toState'],
        postcode = json['toPostCo']
    )
    db.session.add(address_to)
    db.session.commit()

    # create move details
    move = MoveDetails(
        movee_id = json['userId'],
        title = json['title'],
        closing_datetime1 = datetime.strptime(json['date'] + '-' + json['time1'], '%d/%m/%Y-%H:%M'),
        closing_datetime2 = datetime.strptime(json['date'] + '-' + json['time2'], '%d/%m/%Y-%H:%M'),
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
            description = item['desc'],
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

def delete_post(id_to_delete):
    move_to_delete = db.session.query(MoveDetails).filter(MoveDetails.id == id_to_delete).first()
    if not move_to_delete:
        abort(400, 'Post not found/doesn\'t exist')
    else:
        db.session.delete(move_to_delete)
        db.sesssion.commit()
        resp = jsonify({
            'success': True
        })
        resp.status_code = 200
        return resp

def search_moves(json):
    move_query = db.session.query(MoveDetails)

    if 'status' in json:
        move_query = move_query.filter(MoveDetails.status == json['status'])

    if 'budgetLow' in json:
        move_query = move_query.filter(MoveDetails.budget > json['budgetLow'])

    if 'budgetHigh' in json:
        move_query = move_query.filter(MoveDetails.budget < json['budgetHigh'])

    resp = jsonify({
        'moves': map(get_movee_name_and_suburbs, map(translate_address_id, map(MoveDetails.to_dict, move_query.all())))
    })
    resp.status_code = 200
    return resp


def translate_address_id(move):
    address_from_id = move['address_from']
    address_to_id = move['address_to']
    move['address_from'] = db.session.query(FromAddress).filter(FromAddress.id == address_from_id).first().to_dict()
    move['address_to'] = db.session.query(ToAddress).filter(ToAddress.id == address_to_id).first().to_dict()
    return move

def get_movee_name_and_suburbs(move):
    movee = db.session.query(User).filter(User.id == move['movee_id']).first()
    move['movee_name'] = movee.first_name + ' ' + movee.last_name
    move['from_suburb'] = 'Newtown'  # placeholder
    move['to_suburb'] = 'Randwick'   # placeholder
    return move