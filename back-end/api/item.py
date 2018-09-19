from flask import abort, jsonify
from datetime import datetime
from database.model import db
from database.MoveDetails import MoveDetails
from database.FromAddress import FromAddress
from database.ToAddress import ToAddress
from database.Item import Item
from database.User import User

def delete_item(json):
	if 'id' in json:
		id_to_delete = json[id]

	item_to_delete = db.session.query(Item).filter(Item.id == id_to_delete).first()

	if not item_to_delete:
        abort(400, 'Post not found/doesn\'t exist')
    else:
        db.session.delete(item_to_delete)
        db.session.commit()
        resp = jsonify({
            'success': True
        })
        resp.status_code = 200
        return resp