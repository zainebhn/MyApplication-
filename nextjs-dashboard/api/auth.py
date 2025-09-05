# /api/auth.py
from flask import Blueprint, request, jsonify
from .models import User, db
from .utils import generate_uuid

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    user_id = generate_uuid()
    email = data.get('email')
    if User.query.filter_by(email=email).first():
        return jsonify({"message": "Email already registered."}), 400
    new_user = User(
        id=user_id,
        first_name=data.get('first_name'),
        last_name=data.get('last_name'),
        email=email,
        phone_number=data.get('phone_number'),
        is_active=True,
        is_admin=False,
        is_validated=False,
    )
    new_user.set_password(data.get('password'))
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered successfully!", "user_id": user_id}), 201

@auth_bp.route('/validate', methods=['POST'])
def validate_user():
    data = request.get_json()
    user = User.query.get(data.get('user_id'))
    if not user:
        return jsonify({"message": "User not found."}), 404
    user.is_validated = True
    db.session.commit()
    return jsonify({"message": "User validated successfully!"}), 200
