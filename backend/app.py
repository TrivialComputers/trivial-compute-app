from flask import Flask, jsonify, request
import os
import psycopg2
import importlib.metadata

app = Flask(__name__)

DATABASE_URL = os.getenv("DATABASE_URL")

@app.route('/api/version', methods=['GET'])
def test_flask_api():
    return jsonify(message=importlib.metadata.version("flask"))

@app.route('/api/db/version', methods=['GET'])
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
