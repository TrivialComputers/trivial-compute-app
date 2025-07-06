from flask import Flask, jsonify, request
import os
import psycopg2

app = Flask(__name__)

DATABASE_URL = os.getenv("DATABASE_URL")

@app.route('/api/flask_test', methods=['GET'])
def test_flask_api():
    return jsonify(message="Hello from Flask API")

@app.route('/api/db_test')
def hello():
    try:
        conn = psycopg2.connect(DATABASE_URL)
        cur = conn.cursor()
        cur.execute("SELECT version();")
        version = cur.fetchone()
        cur.close()
        conn.close()
        return jsonify({'message': 'Connected to PostgreSQL', 'version': version[0]})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5555)
