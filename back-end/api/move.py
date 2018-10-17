from flask import abort, jsonify
from sqlalchemy import and_, not_, or_
from datetime import datetime
from database.model import db
from database.MoveDetails import MoveDetails
from database.FromAddress import FromAddress
from database.ToAddress import ToAddress
from database.Item import Item
from database.User import User
from database.Comment import Comment
from database.Update import Update
import urllib, json, requests
try:
    # For Python 3.0 and later
    from urllib.request import urlopen
except ImportError:
   # Fall back to Python 2's urllib2
    from urllib2 import urlopen

def create_new_move(json):
    if (
        not json
        or (not 'id' in json)
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
        or (not 'userId' in json)
    ):
        abort(400, 'Not all fields were received.')

    if json['id'] != -1:
        return update_move(json)

    user = db.session.query(User).filter(User.id == json['userId']).first()
    if not user:
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

    now = datetime.now()

    # create move details
    move = MoveDetails(
        movee_id = json['userId'],
        title = json['title'],
        closing_datetime1 = datetime.strptime(json['date'] + '-' + json['time1'], '%d/%m/%Y-%H:%M'),
        closing_datetime2 = datetime.strptime(json['date'] + '-' + json['time2'], '%d/%m/%Y-%H:%M'),
        description = json['desc'],
        budget = int(json['budget']),
        status = 'OPEN',
        creation_datetime = now,
        last_updated = now,
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
            description = item['description'],
            move_id = move.id
        )
        move.items.append(new_item)

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


def update_move(json):
    post = db.session.query(MoveDetails).filter(and_(MoveDetails.id == json['id'], not_(MoveDetails.deleted))).first()
    if not post:
        abort(400, 'Existing post does not exist.')

    if post.status != 'OPEN':
        abort(400, 'You cannot edit a post if you have already accepted an offer for it.')

    old_from = db.session.query(FromAddress).filter(FromAddress.id == post.address_from).first()
    address_from = FromAddress(
        line1 = json['fromAddrL1'],
        line2 = json['fromAddrL2'],
        city = json['fromCity'],
        state = json['fromState'],
        postcode = json['fromPostCo']
    )
    db.session.add(address_from)
    db.session.commit()
    post.address_from = address_from.id

    old_to = db.session.query(ToAddress).filter(ToAddress.id == post.address_to).first()
    address_to = ToAddress(
        line1 = json['toAddrL1'],
        line2 = json['toAddrL2'],
        city = json['toCity'],
        state = json['toState'],
        postcode = json['toPostCo']
    )
    db.session.add(address_to)
    db.session.commit()
    post.address_to = address_to.id

    db.session.delete(old_from)
    db.session.delete(old_to)
    db.session.commit()

    post.title = json['title']
    post.closing_datetime1 = datetime.strptime(json['date'] + '-' + json['time1'], '%d/%m/%Y-%H:%M')
    post.closing_datetime2 = datetime.strptime(json['date'] + '-' + json['time2'], '%d/%m/%Y-%H:%M')
    post.description = json['desc']
    post.budget = int(json['budget'])
    post.last_updated = datetime.now()

    db.session.commit()

    for item in post.items:
        db.session.delete(item)
    for item in json['items']:
        new_item = Item(
            name = item['name'],
            weight = item['weight'],
            volume = item['volume'],
            amount = item['amount'],
            description = item['description'],
            move_id = post.id
        )
        post.items.append(new_item)
    db.session.commit()

    for comment in post.comments:
        comment.is_stale = True
    db.session.commit()

    resp = jsonify({
        'success': True,
        'move': post.to_dict()
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
        'move': decorate_move(move_query.to_dict()),
        'items': list(map(Item.to_dict, move_query.items)),
        'comments': sorted(
            list(map(decorate_comments, map(Comment.to_dict, [c for c in move_query.comments if c.parent_comment is None]))),
            key=lambda c: c['creation_datetime']
        )
    })
    resp.status_code = 200
    return resp


def decorate_comments(comment):
    ''' Adds date string, poster details and child comments '''

    comment['date_string'] = comment['creation_datetime'].strftime('%e %b %-I:%M %p')

    user = db.session.query(User).filter(and_(User.id == comment['poster'], not_(User.deleted))).first()

    comment['poster_details'] = user.to_dict() if user else {
            first_name: '',
            last_name: '[Deleted]',
            id: -1
    }

    comment_query = db.session.query(Comment).filter(Comment.id == comment['id']).first()

    if comment_query.child_comments:
        comment['child_comments'] = sorted(
            list(map(decorate_comments, map(Comment.to_dict, comment_query.child_comments))),
            key=lambda c: c['creation_datetime']
        )
    else:
        comment['child_comments'] = []

    return comment


def search_moves(json):
    move_query = db.session.query(MoveDetails).filter(not_(MoveDetails.deleted))

    if 'status' in json and json['status'] != '':
        move_query = move_query.filter(MoveDetails.status == json['status'])

    if 'lowerBudget' in json and json['lowerBudget'].isdigit() and json['lowerBudget'] != -1:
        move_query = move_query.filter(MoveDetails.budget >= int(json['lowerBudget']))

    if 'upperBudget' in json and json['upperBudget'].isdigit() and json['upperBudget'] != -1:
        move_query = move_query.filter(MoveDetails.budget <= int(json['upperBudget']))

    if 'lowerDate' in json and json['lowerDate'] and json['lowerDate'] != '':
        move_query = move_query.filter(MoveDetails.closing_datetime1 >= json['lowerDate'])

    if 'upperDate' in json and json['upperDate'] and json['upperDate'] != '':
        move_query = move_query.filter(MoveDetails.closing_datetime1 <= json['upperDate'])

    if 'postcode' in json and json['postcode'] != '':
        move_query = move_query.join(FromAddress, FromAddress.id == MoveDetails.address_from).join(ToAddress, ToAddress.id == MoveDetails.address_to)
        move_query = move_query.filter(or_(FromAddress.postcode == json['postcode'], ToAddress.postcode == json['postcode']))

    # if 'sort' in json:
    if json['sortBy'] == 1:
        move_query = move_query.order_by(MoveDetails.creation_datetime)
    elif json['sortBy'] == 2:
        move_query = move_query.order_by(MoveDetails.budget)
    elif json['sortBy'] == 3:
        move_query = move_query.order_by(MoveDetails.budget.desc())
    elif json['sortBy'] == 4:
        move_query = move_query.order_by(MoveDetails.closing_datetime1)
    elif json['sortBy'] == 5:
        move_query = move_query.order_by(MoveDetails.closing_datetime1.desc())

    resp = jsonify({
        'moves': list(map(decorate_move, map(MoveDetails.to_dict, move_query.all())))
    })
    resp.status_code = 200
    return resp


def decorate_move(move):
    address_from_id = move['address_from']
    address_to_id = move['address_to']
    move['address_from'] = db.session.query(FromAddress).filter(FromAddress.id == address_from_id).first().to_dict()
    move['address_to'] = db.session.query(ToAddress).filter(ToAddress.id == address_to_id).first().to_dict()

    movee = db.session.query(User).filter(User.id == move['movee_id']).first()
    move['movee'] = movee.to_dict()

    if move['closing_datetime1'].strftime('%-I:%M %p') == move['closing_datetime2'].strftime('%-I:%M %p'):
        move['date_string'] = move['closing_datetime2'].strftime('%-I:%M %p on %d %B %Y')
    else:
        move['date_string'] = move['closing_datetime1'].strftime('%-I:%M %p to ') + move['closing_datetime2'].strftime('%-I:%M %p on %d %B %Y')
    return move


def mark_move_as_accepted(json):
    if (
        not json
        or (not 'postId' in json)
        or (not 'offerId' in json)
    ):
        abort(400, 'Not all required fields were received.')

    move_query = db.session.query(MoveDetails).filter(and_(MoveDetails.id == json['postId'], not_(MoveDetails.deleted))).first()
    if not move_query:
        abort(400, 'Given postId does not match any existing posts.')

    move_query.status = 'ACCEPTED'

    offer = [x for x in move_query.comments if x.id == json['offerId']]
    if not offer:
        abort(400, 'Given offerId does not match with given postId.')

    move_query.chosen_offer = json['offerId']

    db.session.commit()

    update = Update(
        update_type = 'accepted',
        updated_movee_id = offer[0].poster,
        concerning_movee_id = move_query.movee_id,
        description = '',
        move_id = move_query.id,
        update_time = datetime.now()
    )

    db.session.add(update)
    db.session.commit()

    resp = jsonify({
        'success': True
    })
    resp.status_code = 200
    return resp



def get_distance(output, start_line1, start_city, start_state, end_line1, end_city, end_state):
    # output = 1 for FULL DISTANCE
    # output = 0 for SCRAMBLED DISTANCE
    start = " "
    end = " "

    if start_city and start_state and end_city and end_state:
        if output == 1 and start_line1 and end_line1:
            # Exact distance after job accepted
            start = start.join([start_line1, ",", start_city, ",", start_state])
            end = end.join([end_line1, ",", end_city, ",", end_state])
        elif output == 0:
            # Rough Distance for initial display
            start = start.join([start_city, ",", start_state])
            end = end.join([end_city, ",", end_state])

    api_key = 'AIzaSyD3oXn3Rb9kUQRf5yC2lhLov1KpwFzmbIA'
    request_url = "https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=%s&destinations=%s&key=%s" % (start, end, api_key)

    json_data = ''
    try:
        response = requests.get(request_url)
        json_data = json.loads(response.text)
    except:
        pass

    distance_in_metres = ""
    if 'status' in json_data and json_data['status'] == 'OK':
        distance_in_metres = int(json_data['rows'][0]['elements'][0]['distance']['value'])

    return distance_in_metres

# Example INPUT
# start_line1 = "11 York St"
# start_city = "Wynyard"
# start_state = "NSW"

# end_line1 = "High St"
# end_city = "Kensington"
# end_state = "NSW"

# distance = get_distance(start_line1, start_city, start_state, end_line1, end_city, end_state)
# print(distance)
#
# Example API Response
# {
#    "destination_addresses" : [ "High St, Kensington NSW 2033, Australia" ],
#    "origin_addresses" : [ "11 York St, Sydney NSW 2000, Australia" ],
#    "rows" : [
#       {
#          "elements" : [
#             {
#                "distance" : {
#                   "text" : "7.9 km",
#                   "value" : 7912
#                },
#                "duration" : {
#                   "text" : "18 mins",
#                   "value" : 1069
#                },
#                "status" : "OK"
#             }
#          ]
#       }
#    ],
#    "status" : "OK"
# }


def close_move(json):
    if (
        not json
        or (not 'postId' in json)
    ):
        abort(400, 'Not all required fields were received.')

    move = db.session.query(MoveDetails).filter(and_(MoveDetails.id == json['postId'], not_(MoveDetails.deleted))).first()
    if not move:
        abort(400, 'Post does not exist.')


    move.status = 'CLOSED'
    db.session.commit()

    chosen_removalist = db.session.query(Comment).filter(Comment.id == move.chosen_offer).first().poster

    update1 = Update(
        update_type = 'close_movee',
        updated_movee_id = move.movee_id,
        concerning_movee_id = chosen_removalist,
        description = '',
        move_id = move.id,
        update_time = datetime.now()
    )

    update2 = Update(
        update_type = 'close_removalist',
        updated_movee_id = chosen_removalist,
        concerning_movee_id = move.movee_id,
        description = '',
        move_id = move.id,
        update_time = datetime.now()
    )

    db.session.add(update1)
    db.session.add(update2)
    db.session.commit()

    resp = jsonify({
        'success': True
    })
    resp.status_code = 200
    return resp