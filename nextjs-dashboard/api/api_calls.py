from flask import Blueprint, request, jsonify
from .models import APICall, APICallSummary
from .config import db
import uuid
from datetime import datetime

api_bp = Blueprint('api_calls', __name__)

@api_bp.route('/log', methods=['POST'])
def log_api_call():
    data = request.get_json()
    call_id = str(uuid.uuid4())
    api_name = data.get('api_name')
    status = data.get('status')
    new_call = APICall(id=call_id, api_name=api_name, status=status)
    db.session.add(new_call)
    db.session.commit()
    return jsonify({"message": "API call logged successfully!"}), 201

@api_bp.route('/summary', methods=['GET'])
def get_api_summary():
    summary = APICallSummary.query.all()
    return jsonify([
        {
            "date": item.date.strftime('%Y-%m-%d'),
            "totalCalls": item.total_calls,
            "successCalls": item.success_calls,
            "failureCalls": item.failure_calls
        }
        for item in summary
    ])
