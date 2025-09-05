from flask import Blueprint, request, jsonify
from .models import User, db
import re

users_bp = Blueprint('users', __name__)

@users_bp.route('/validate/<int:user_id>', methods=['POST'])
def validate_user(user_id):
    user = User.query.get_or_404(user_id)
    user.is_validated = True
    db.session.commit()
    return jsonify({'message': 'User validated successfully'}), 200

@users_bp.route('/reject/<int:user_id>', methods=['POST'])
def reject_user(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User rejected and deleted'}), 200

@users_bp.route('/set-admin/<int:user_id>', methods=['POST'])
def set_admin(user_id):
    user = User.query.get_or_404(user_id)
    user.is_admin = True
    db.session.commit()
    return jsonify({'message': 'User set as admin'}), 200

@users_bp.route('/unvalidated', methods=['GET'])
def get_unvalidated_users():
    users = User.query.filter_by(is_validated=False).all()
    return jsonify([user.to_dict() for user in users]), 200