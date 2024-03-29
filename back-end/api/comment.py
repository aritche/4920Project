from flask import abort, jsonify
from sqlalchemy import and_, not_
from datetime import datetime
from database.model import db
from database.User import User
from database.MoveDetails import MoveDetails
from database.Comment import Comment
from database.Update import Update
from database.PostRecord import PostRecord


def add_comment(json):
    if (
        not json
        or not ('postId' in json)
        or not ('userId' in json)
        or not ('commentText' in json)
    ):
        abort(400, 'Not all fields were received.')

    post_query = db.session.query(MoveDetails).filter(and_(MoveDetails.id == json['postId'], not_(MoveDetails.deleted))).first()
    if not post_query:
        abort(400, 'Post with given id does not exist.')

    user_query = db.session.query(User).filter(and_(User.id == json['userId'], not_(User.deleted))).first()
    if not user_query:
        abort(400, 'User with given id does not exist.')

    if 'parentCommentId' in json:
        comment_query = db.session.query(Comment).filter(Comment.id == json['parentCommentId']).first()
        if not comment_query:
            abort(400, 'Comment with given parentCommentId does not exist.')
        comment = Comment(
            poster=user_query.id,
            parent_post=post_query.id,
            creation_datetime=datetime.now(),
            text=json['commentText'],
            parent_comment=json['parentCommentId'],
            is_offer=False
        )
    else:
        comment = Comment(
            poster=user_query.id,
            parent_post=post_query.id,
            creation_datetime=datetime.now(),
            text=json['commentText'],
            is_offer=False
        )

    post_query.comments.append(comment)

    db.session.commit()

    if 'parentCommentId' in json and comment_query.poster != user_query.id:
        update = Update(
            update_type = 'comment_reply',
            updated_movee_id = comment_query.poster,
            concerning_movee_id = user_query.id,
            description = json['commentText'],
            move_id = post_query.id,
            update_time = datetime.now()
        )

        db.session.add(update)
        db.session.commit()

    if post_query.movee_id != user_query.id and not 'parentCommentId' in json:
        update = Update(
            update_type = 'comment',
            updated_movee_id = post_query.movee_id,
            concerning_movee_id = user_query.id,
            description = json['commentText'],
            move_id = post_query.id,
            update_time = datetime.now()
        )

        db.session.add(update)
        db.session.commit()

    if user_query.user_type == 'Removalist':
        post_record = db.session.query(PostRecord).filter(and_(
            PostRecord.move_id == post_query.id,
            PostRecord.user_id == user_query.id
        )).first()
        if not post_record:
            post_record = PostRecord(
                move_id = post_query.id,
                user_id = user_query.id,
                last_updated = datetime.now()
            )
            user_query.post_records.append(post_record)
        else:
            post_record.last_updated = datetime.now()
        db.session.commit()

    resp = jsonify({
        'comment': comment.to_dict(),
        'commenter': user_query.to_dict()
    })
    resp.status_code = 200
    return resp


def add_offer(json):
    if (
        not json
        or not ('postId' in json)
        or not ('userId' in json)
        or not ('offerDescription' in json)
        or not ('offerAmount' in json)
    ):
        abort(400, 'Not all fields were received.')

    post_query = db.session.query(MoveDetails).filter(and_(MoveDetails.id == json['postId'], not_(MoveDetails.deleted))).first()
    if not post_query:
        abort(400, 'Post with given id does not exist.')

    user_query = db.session.query(User).filter(and_(User.id == json['userId'], not_(User.deleted))).first()
    if not user_query:
        abort(400, 'User with given id does not exist.')

    comment = Comment(
        poster=user_query.id,
        parent_post=post_query.id,
        creation_datetime=datetime.now(),
        text=json['offerDescription'],
        offer_amount=json['offerAmount'],
        is_offer=True
    )

    post_query.comments.append(comment)
    db.session.commit()

    if post_query.movee_id != user_query.id:
        update = Update(
            update_type = 'offer',
            updated_movee_id = post_query.movee_id,
            concerning_movee_id = user_query.id,
            description = json['offerDescription'],
            amount = json['offerAmount'],
            move_id = post_query.id,
            update_time = datetime.now()
        )

        db.session.add(update)
        db.session.commit()

    if user_query.user_type == 'Removalist':
        post_record = db.session.query(PostRecord).filter(and_(
            PostRecord.move_id == post_query.id,
            PostRecord.user_id == user_query.id
        )).first()
        if not post_record:
            post_record = PostRecord(
                move_id = post_query.id,
                user_id = user_query.id,
                last_updated = datetime.now()
            )
            user_query.post_records.append(post_record)
        else:
            post_record.last_updated = datetime.now()
        db.session.commit()


    resp = jsonify({
        'offer': comment.to_dict(),
        'offered_by': user_query.to_dict()
    })
    resp.status_code = 200
    return resp