from . import db
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy





class User(db.Model):
    id = db.Column(db.String, primary_key=True, unique=True, nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone_number = db.Column(db.String(20), nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    is_active = db.Column(db.Boolean, default=True, nullable=False)
    is_admin = db.Column(db.Boolean, default=False, nullable=False)
    is_validated = db.Column(db.Boolean, default=False, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class APICall(db.Model):
    id = db.Column(db.String, primary_key=True, unique=True, nullable=False)
    api_name = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(10), nullable=False)  # 'success' or 'failure'
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

class APICallSummary(db.Model):
    date = db.Column(db.Date, primary_key=True, nullable=False)
    total_calls = db.Column(db.Integer, nullable=False)
    success_calls = db.Column(db.Integer, nullable=False)
    failure_calls = db.Column(db.Integer, nullable=False)

class MostUsedApi(db.Model):
    api_name = db.Column(db.String(100), primary_key=True, nullable=False)
    call_count = db.Column(db.Integer, nullable=False)

class LeastUsedApi(db.Model):
    api_name = db.Column(db.String(100), primary_key=True, nullable=False)
    call_count = db.Column(db.Integer, nullable=False)
