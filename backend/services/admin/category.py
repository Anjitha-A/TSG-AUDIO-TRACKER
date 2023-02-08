from models.models import Category
from flask import jsonify
from flask import request
from app import app
from services.db_services import execute,closeConnection,commitConnection
from services.jwt import tocken_required
import pymysql
from services.logger import *
from config import mydb

        
# insert categories of audios to category table
@app.route('/category', methods=['POST'])
@tocken_required
def addCategory(id=None):
    try:
        json = request.json
        category = json['category']
        categoryobj = Category(id, category)
        if category and request.method == 'POST' :
            # conn = mydb.connect()
            # cursor = conn.cursor(pymysql.cursors.DictCursor)
            sqlQuery = "INSERT INTO category(category) VALUES( %s)"
            bindData = categoryobj.category
            execute(sqlQuery,bindData)
            # conn.commit()
            commitConnection()
            response = jsonify('Category is added successfully')
            response.status_code = 200
            return response
        else:
            return "something went wrong"
    except KeyError:
        return jsonify('One value is missing..  All fields are mandatory')
    except pymysql.IntegrityError as e:
        logger.error(f"IntegrityError: {e}")
        return jsonify('You are entering wrong category id , which is not in table..!!!')
    except Exception as e :
        return jsonify('something went wrong..!!')
    
# delete a particular category from category table
@app.route('/category/<id>', methods=['DELETE'])
@tocken_required
def deleteCategory(id, category=None):
    try:
        # conn = mydb.connect()
        # cursor = conn.cursor(pymysql.cursors.DictCursor)
        categoryobj = Category(id, category)
        sqlQuery = "SELECT category FROM category WHERE id =%s"
        bindData = categoryobj.id
        data = execute(sqlQuery, bindData)
        print(data)
        if data == 0:
            # conn.commit()
            commitConnection()
            response = jsonify('Category does not exist')
            return response
        elif data == 1:
            sqlQuery = "DELETE FROM category WHERE categoryid =%s"
            bindData = categoryobj.id
            execute(sqlQuery,bindData)
            # conn.commit()
            commitConnection()
            respone = jsonify('this category deleted successfully!')
            respone.status_code = 200
            return respone
    except Exception as e:
        print(e)
        return jsonify('something went wrong')



#category list view

@app.route('/category', methods=['GET'])
@tocken_required
def viewCategory():
    try:   
        conn = mydb.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT id, category FROM category")
        empRows = cursor.fetchall()
        conn.commit()
        # commitConnection()
        respone = jsonify(empRows)
        respone.status_code = 200
        return respone
    except Exception as e:
        print(e)
        return jsonify("error")