import uuid

def generate_uuid():
    return str(uuid.uuid4())

def format_api_summary(summary_list):
    return [{'apiName': api_name, 'callCount': count} for api_name, count in summary_list]
