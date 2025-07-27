from models import Game, Player, Question
from config import app, db
from flask import Flask, jsonify, request
import os
from datetime import datetime
import random

flask_start_time = datetime.now()

@app.route('/api/game/join', methods=['POST'])
def create_player_join_game():
    data = request.get_json()
    game_id = data.get('game_id')
    username = data.get('username')    
    position = data.get('position')

    try:
        game = Game.query.filter_by(game_code=game_id).first()
        if not game:
            return jsonify({"error": "Game not found"}), 404
        
        player = Player(
            username=username,
            id=random.randint(1000, 9999),
            host=False,
            gameCode=game_id,
            position=position
        )
        if not player:
            return jsonify({"error": "Missing information for player"}), 400
        
        db.session.add(player)
        db.session.commit()
        return jsonify({"message": "Created user"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/game/create', methods=['POST'])
def create_game():
    data = request.get_json()
    playerCount = data.get('count')
    gameCode = data.get('gameCode')
    try:
        game = Game(
            id=gameCode,
            game_code=gameCode,
            player_count=playerCount,
            date=datetime.now()
        )
        db.session.add(game)
        db.session.commit()
        return jsonify({"message": f"Game created with code {gameCode}"}), 201
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

@app.route('/api/move', methods=['POST'])
def validate_move():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid or missing JSON"}), 400

    source = data.get('sourceIndex')
    dest = data.get('destIndex')

    if source is None or dest is None:
        return jsonify({"error": "Missing sourceIndex or destIndex"}), 400

    try:
        source = int(source)
        dest = int(dest)

        player = Player.query.filter_by(position=source).first()
        if not player:
            return jsonify({"error": "No player found at source position"}), 404

        if Player.query.filter_by(position=dest).first():
            return jsonify({"error": "Player already in destination position"}), 409

        player.position = dest
        db.session.commit()

        return jsonify({"message": "Moved successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/question', methods=['GET'])
def get_question_by_category():
    category = request.args['category']
    try:
        questionBank = Question.query.filter_by(category=category).all()
        
        if questionBank:
            question = random.choice(questionBank)
            json_question = question.to_json()
            return jsonify({"question": json_question}), 201
        else:
            return jsonify({"error": f"No questions found for category={category}"}), 404
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
