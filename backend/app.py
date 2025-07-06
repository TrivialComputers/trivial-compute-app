from flask import Flask, jsonify, request
import os
import psycopg2
from datetime import datetime
import importlib.metadata

app = Flask(__name__)
flask_start_time = datetime.now()

DATABASE_URL = os.getenv("DATABASE_URL")

@app.route('/api/version', methods=['GET'])
def get_flask_version():
    return jsonify(message=importlib.metadata.version("flask"))

@app.route('/api/uptime', methods=['GET'])
def get_test_flask_api():
    return jsonify({"uptime": f"[+] Flask Uptime = {str(datetime.now() - flask_start_time)}"})

@app.route('/api/db/version', methods=['GET'])
def get_db_version():
    try:
        conn = psycopg2.connect(DATABASE_URL)
        cur = conn.cursor()
        cur.execute("SELECT version();")
        version = cur.fetchone()
        cur.close()
        conn.close()
        return jsonify({'version': version[0]})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/db/uptime', methods=['GET'])
def get_db_uptime():
    try:
        conn = psycopg2.connect(DATABASE_URL)
        cur = conn.cursor()
        cur.execute("SELECT now() - pg_postmaster_start_time() AS uptime;")
        uptime = cur.fetchone()[0]
        cur.close()
        conn.close()
        return jsonify({'uptime': f"[+] Posgresql Uptime = {str(uptime)}"})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5555)
