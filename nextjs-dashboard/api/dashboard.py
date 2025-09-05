from flask import Blueprint, jsonify
from .models import APICall, APICallSummary, MostUsedApi, LeastUsedApi
from .utils import format_api_summary

dashboard_bp = Blueprint('dashboard', __name__)

@dashboard_bp.route('/card-data', methods=['GET'])
def get_card_data():
    try:
        daily_api_calls = APICall.query.count()
        successes = APICall.query.filter_by(status='success').count()
        failures = APICall.query.filter_by(status='failure').count()

        most_used_apis = format_api_summary(
            APICall.query.with_entities(APICall.api_name, db.func.count().label('count'))
            .group_by(APICall.api_name).order_by(db.desc('count')).limit(1).all()
        )

        least_used_apis = format_api_summary(
            APICall.query.with_entities(APICall.api_name, db.func.count().label('count'))
            .group_by(APICall.api_name).order_by('count').limit(1).all()
        )

        return jsonify({
            'dailyApiCalls': daily_api_calls,
            'successes': successes,
            'failures': failures,
            'mostUsedApis': most_used_apis,
            'leastUsedApis': least_used_apis,
        }), 200

    except Exception as e:
        app.logger.error(f"Error fetching card data: {e}")
        return jsonify({'error': 'An error occurred while fetching card data.'}), 500

# Other routes...
