from functools import wraps
from datetime import datetime, timedelta
import bcrypt
from models.models import User
import jwt
import pymysql
from config import mydb
from flask import jsonify
from flask import request
from app import app
from validations import validateRegisterData,validateLoginData
from services.db_services import execute,closeConnection,commitConnection
from services.logger import *

# def tocken_required(func):
#     @wraps(func)
#     def decorated(*args, **kwargs):
#         access_token = request.args.get('access_token')
#         if not access_token:
#             return jsonify({"alert":"Token is missing..!!"})
#         try:
#             payload = jwt.decode(access_token, app.config['JWT_SECRET_KEY'])
#         except:
#             return jsonify({"alert":"Invalid Token"})
#     return decorated




# registration of user, here datas are entered to user table
@app.route('/register', methods=['POST'])
def register(id=None):
    try:
        json = request.json
        fullname = json['fullname']
        username = json['username']
        password = json['password']
        usertype = "2"
        validation_error = validateRegisterData(fullname, username, password)
        if validation_error:
            return validation_error
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        print(hashed_password)
        user = User (id, fullname, username, hashed_password, usertype)
        if fullname and username and password and usertype and request.method == 'POST' :
            # conn = mydb.connect()
            # cursor = conn.cursor(pymysql.cursors.DictCursor)
            query = "SELECT fullname FROM user WHERE username= %s"
            bindData = user.username
            data = execute(query, bindData)
            #data will return 1 when the query excecutes successfully and return 0 when no such record is found
            if(data == 1):
                # conn.commit()
                commitConnection()
                return jsonify('Usre already exist !!')
            elif (data == 0):
                sqlQuery = "INSERT INTO user(fullname, username, password, usertype) VALUES( %s, %s, %s, %s)"
                bindData = (user.fullname, user.username, user.password, user.usertype)
                execute(sqlQuery, bindData)
                # conn.commit()
                commitConnection()
                respone = jsonify('User added successfully!')
                respone.status_code = 200
                return respone
        else:
            return jsonify("something went wrong")
    except KeyError as e:
        logger.error(f"KeyError: {e}")
        return jsonify('Some Columns are missing or Mispelled the Column name')
    except Exception as e :
        print(e)
        logger.error(f"Error: {e}")
        return jsonify('something went wrong')

# login function of user
@app.route('/login', methods = ['POST'])
def login(id=None, fullname=None, usertype=None):
    try: 
        json = request.json
        username = json['username']
        password = json['password']
        validation_error = validateLoginData( username, password)
        if validation_error:
            return validation_error
        user = User (id, fullname, username, password, usertype)
        if username and password and request.method == 'POST' :
            conn = mydb.connect()
            cursor = conn.cursor(pymysql.cursors.DictCursor)
            query = "SELECT * FROM user WHERE username= %s"
            bindData = user.username
            data = cursor.execute(query, bindData)
            if(data == 1):
                row = cursor.fetchone()
                hashed_password = row.get('password')
                usertype = row.get('usertype')
                if ( bcrypt.checkpw(user.password.encode('utf-8'),hashed_password.encode('utf-8'))):
                    access_token = jwt.encode(
                     {'username': username,
                     'expiration': str(datetime.utcnow() + timedelta(minutes=30))},
                     app.config['JWT_SECRET_KEY']
                     )
                    conn.commit()
                    return jsonify(message='Login Successful', access_token=access_token ,usertype=usertype),200
                else:
                    conn.commit()
                    return jsonify('Password is incorrect, Try with the correct one..!!')
            else:
                conn.commit()
                return jsonify('Bad email or Password... Access Denied!'), 401
    except KeyError as e:
        logger.error(f"KeyError: {e}")
        return jsonify(' Some Columns are missing or Mispelled the Column name')
    except Exception as e :
        print(e)
        return jsonify('something went wrong')

# @app.route('/auth')
# @tocken_required
# def auth():
#     return 'jwt'


