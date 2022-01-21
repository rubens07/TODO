from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from os import getenv

app = Flask(__name__)
app.config['MYSQL_HOST'] = getenv('MYSQL_HOST')
app.config['MYSQL_USER'] = getenv('MYSQL_USER')
app.config['MYSQL_PASSWORD'] = getenv('MYSQL_PASSWORD')
app.config['MYSQL_DB'] = getenv('MYSQL_DATABASE')
mysql = MySQL(app)

@app.route('/', methods=['GET',])
def home():
    return jsonify({"msg": "Server is online"})

@app.route('/check-connection', methods=['GET', ])
def check_mysql():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM tasks")
    mysql.connection.commit()
    cur.close()

    return jsonify({'msg': 'Funcionou'})


if __name__ == '__main__':
    PORT = getenv('BACKEND_PORT') or '5000'
    HOST = getenv('BACKEND_HOST') or '0.0.0.0'

    host = f"Server running on {HOST}:{PORT}"
    line = "-"*len(host)
    print(f"|=== {line} ===|")
    print(f"|=== {host} ===|")
    print(f"|=== {line} ===|")
    app.run(host=HOST, port=PORT)
