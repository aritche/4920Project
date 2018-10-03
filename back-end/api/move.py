from flask import abort, jsonify
from sqlalchemy import and_, not_, or_
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
        or (not 'fromAddrL1' in json)
        or (not 'fromAddrL2' in json)
        or (not 'fromCity' in json)
        or (not 'fromState' in json)
        or (not 'fromPostCo' in json)
        or (not 'toAddrL1' in json)
        or (not 'toAddrL2' in json)
        or (not 'toCity' in json)
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
        line1 = json['fromAddrL1'],
        line2 = json['fromAddrL2'],
        city = json['fromCity'],
        state = json['fromState'],
        postcode = json['fromPostCo']
    )
    db.session.add(address_from)

    address_to = ToAddress(
        line1 = json['toAddrL1'],
        line2 = json['toAddrL2'],
        city = json['toCity'],
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
        budget = int(json['budget']),
        status = 'OPEN',
        creation_datetime = datetime.now(),
        address_from = address_from.id,
        address_to = address_to.id,
        deleted = False
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

def delete_move_details(json):
    if 'postId' in json:
        id_to_delete = json['postId']

    move_to_delete = db.session.query(MoveDetails).filter(and_(MoveDetails.id == id_to_delete, not_(MoveDetails.deleted))).first()

    if not move_to_delete:
        abort(400, 'Post not found/doesn\'t exist')
    else:
        move_to_delete.deleted = True
        db.session.commit()
        resp = jsonify({
            'success': True
        })
        resp.status_code = 200
        return resp


def get_move_details(post_id):
    move_query = db.session.query(MoveDetails).filter(and_(MoveDetails.id == post_id, not_(MoveDetails.deleted))).first()
    if not move_query:
        abort(400, 'Post id does not match any existing posts.')

    resp = jsonify({
        'move': get_movee_details(get_address_details(move_query.to_dict()))
    })
    resp.status_code = 200
    return resp

def search_moves(json):
    move_query = db.session.query(MoveDetails).filter(not_(MoveDetails.deleted))

    if 'status' in json and json['status'] != '':
        move_query = move_query.filter(MoveDetails.status == json['status'])

    print('rtorgknfg')

    if 'lowerBudget' in json and json['lowerBudget'].isdigit() and json['lowerBudget'] != -1:
        print('HRELLOGRG')
        print(map(MoveDetails.to_dict, move_query.all()))
        move_query = move_query.filter(MoveDetails.budget >= int(json['lowerBudget']))

    if 'upperBudget' in json and json['upperBudget'].isdigit() and json['upperBudget'] != -1:
        move_query = move_query.filter(MoveDetails.budget <= int(json['upperBudget']))

    if 'lowerDate' in json and json['lowerDate'] and json['lowerDate'] != '':
        move_query = move_query.filter(MoveDetails.closing_datetime1 >= json['lowerDate'])

    if 'upperDate' in json and json['upperDate'] and json['upperDate'] != '':
        move_query = move_query.filter(MoveDetails.closing_datetime1 <= json['upperDate'])

    if 'postcode' in json and json['postcode'] != '':
        move_query.join(FromAddress, FromAddress.id == MoveDetails.address_from).join(ToAddress, ToAddress.id == MoveDetails.address_to)
        move_query = move_query.filter(or_(FromAddress.postcode == json['postcode'], ToAddress.postcode == json['postcode']))

    resp = jsonify({
        'moves': list(map(get_movee_details, map(get_address_details, map(MoveDetails.to_dict, move_query.all()))))
    })
    resp.status_code = 200
    return resp


def get_address_details(move):
    address_from_id = move['address_from']
    address_to_id = move['address_to']
    move['address_from'] = db.session.query(FromAddress).filter(FromAddress.id == address_from_id).first().to_dict()
    move['address_to'] = db.session.query(ToAddress).filter(ToAddress.id == address_to_id).first().to_dict()
    return move


def get_movee_details(move):
    movee = db.session.query(User).filter(User.id == move['movee_id']).first()
    move['movee'] = movee.to_dict()
    return move
