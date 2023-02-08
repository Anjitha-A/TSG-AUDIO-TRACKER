from app import app
from flask_jwt_extended import JWTManager, jwt_required, create_access_token
from flaskext.mysql import MySQL

mydb = MySQL()
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'password'
app.config['MYSQL_DATABASE_DB'] = 'audio_tracker'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
# jwt secret key for creating the jwt token
app.config['JWT_SECRET_KEY'] = '4963cf9d82bb49849dfbd93bfb80bd88'
app.config['CORS_HEADERS'] = 'Content-Type'
mydb.init_app(app)
jwt = JWTManager(app)