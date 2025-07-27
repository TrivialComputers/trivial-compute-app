from models import Game, Player, Question
from config import app, db
from flask import Flask, jsonify, request
import os
from datetime import datetime
from random import random

flask_start_time = datetime.now()

@app.route('/api/game/join', methods=['POST'])
def create_player_join_game():
    data = request.get_json()
    game_id = data.get('game_id')
    username = data.get('username')    

    try:
        game = Game.query.filter_by(game_code=game_id).first()
        if not game:
            return jsonify({"error": "Game not found"}), 404
        
        player = Player(
            username=username,
            player_id=random.randint(1000, 9999),
            host=False,
            game_code=game_id
        )
        if not player:
            return jsonify({"error": "Missing information for player"}), 400
        
        game.session.add(player)
        db.session.commit()
        return jsonify({"id": game}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/create_question', methods=['POST'])
def create_question():
    question = request.json.get('question')
    answer = request.json.get('answer')
    category = request.json.get('category')
    if not question or not answer or not category:
        return (jsonify({"message": "Missing question, answer, or category"}), 400)
    
    new_question = Question(
        question=question,
        answer=answer,
        category=category
    )

    try:
        db.session.add(new_question)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
    return jsonify({"message": "Question created successfully"}), 201
    
@app.route('/api/get_question/<int:question_id>', methods=['PATCH'])
def get_question_by_id(question_id):
    try:
        question = Question.query.get(question_id)
        json_question = map(lambda q: q.to_json(), question)

        return jsonify({"question": json_question}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/questions', methods=['GET'])
def get_questions():
    try:
        questions = Question.query.all()
        json_questions = list(map(lambda q: q.to_json(), questions))
        return jsonify({"questions": json_questions})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500  

if __name__ == '__main__':
    with app.app_context():
        db.create_all()

    app.run(host='0.0.0.0', port=5555, debug=True)
