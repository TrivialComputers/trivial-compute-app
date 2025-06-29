from flask import Flask, jsonify
import os
import psycopg2

app = Flask(__name__)

@app.route('/api/test')
def hello():
    return jsonify(message="Test endpoint")

