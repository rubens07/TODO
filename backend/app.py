from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from flask_cors import CORS
from os import getenv


app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.config['MYSQL_HOST'] = getenv('MYSQL_HOST')
app.config['MYSQL_USER'] = getenv('MYSQL_USER')
app.config['MYSQL_PASSWORD'] = getenv('MYSQL_PASSWORD')
app.config['MYSQL_DB'] = getenv('MYSQL_DATABASE')
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
mysql = MySQL(app)

@app.route('/', methods=['GET',])
def home():
    return jsonify({"msg": "Server is online"})

@app.route('/list-tasks', methods=['GET', ])
def listTasks():
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM tasks")
        result = cur.fetchall()
        cur.close()

    except Exception as error:
        return jsonify({"tasks": [], "Error": str(error)})

    return jsonify({"tasks": result})

@app.route('/add-task', methods=['POST', ])
def addTask():
    description = request.form.get('description')
    if not description: return jsonify({'msg':'Description not sent.'})
    id = 0

    try:
        cur = mysql.connection.cursor()
        query = """INSERT INTO tasks(description, status) VALUES ("{}", {})""".format(description, 0)

        cur.execute(query)
        id = cur.lastrowid
        mysql.connection.commit()
        cur.close()
    except Exception as error:
        return jsonify({"msg": "Error", "status": 500, "error": str(error)})

    return jsonify({
            "msg": f'Task {id} Add',
            "id": id,
            "status": 200,
            "description": description
        })

@app.route('/update-task', methods=['PUT', ])
def updateTask():
    id = request.form.get('id')
    description = request.form.get('description')
    status = request.form.get('status')
    if not id: return jsonify({'msg': 'ID not sent.'})
    if status not in ["0", "1"]: return jsonify({'msg': 'Incorrect Status.'})

    try:
        cur = mysql.connection.cursor()
        query = """UPDATE tasks SET description="{}", status={}
                WHERE id={}""".format(description, status, id)
        cur.execute(query)
        mysql.connection.commit()
        cur.close()
    except Exception as error:
        return jsonify({'msg': 'Error', "status": 500, "error": str(error)})
    
    return jsonify({'msg': f"Task {id} has been updated.", "status": 200, "id": id})

@app.route('/delete-task', methods=['DELETE', ])
def deleteTask():
    id = request.form.get('id')
    if not id: return jsonify({'msg': 'ID not sent.'})

    try:
        cur = mysql.connection.cursor()
        query = """DELETE FROM tasks where id={}""".format(id)
        cur.execute(query)
        mysql.connection.commit()
        cur.close()
    except Exception as error:
        return jsonify({'msg': 'Error', "status": 500, 'error': str(error)})
    
    return jsonify({'msg': f"Task {id} has been deleted.", "id": id, "status": 200})


if __name__ == '__main__':
    PORT = getenv('BACKEND_PORT') or '5000'
    HOST = getenv('BACKEND_HOST') or '0.0.0.0'

    host = f"Server running on {HOST}:{PORT}"
    line = "-"*len(host)
    print(f"|=== {line} ===|")
    print(f"|=== {host} ===|")
    print(f"|=== {line} ===|")
    app.run(host=HOST, port=PORT)
