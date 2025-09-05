from api import create_app, db
from flask_migrate import Migrate
from api.models import db

app = create_app()
migrate = Migrate(app, db)

if __name__ == "__main__":
     app.run(debug=True, port=5328)