
from functools import wraps
from datetime import datetime, timedelta
import json
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
from services.jwt import tocken_required

#searching audios by title, category or album
@app.route('/search', methods=['POST'])
@tocken_required
def search():
    try:
        json = request.json
        search_value = json['search_value']
        print(search_value)
        conn = mydb.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        data = cursor.execute("SELECT * FROM audio WHERE title LIKE %s OR  album LIKE %s", ('%' + search_value + '%',  '%' + search_value + '%'))
        # cursor.execute("SELECT title FROM audio WHERE title LIKE %s OR artist LIKE %s OR album LIKE %s",(search_value,search_value,search_value))
        print(data)
        row = cursor.fetchall()
        conn.commit()
        print("emprow", row) 
        
        # return jsonify(row) 
        response = jsonify(row)
        response.status_code = 200
        return response
    except Exception as e:
        print(e)









