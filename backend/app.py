from models import Game, Player, Question
from config import app, db
from flask import Flask, jsonify, request
import os
from datetime import datetime
import random
import json

flask_start_time = datetime.now()

@app.route('/api/create_game', methods=['POST'])
def create_game():
    username = request.json.get('username')
    if not username:
        return (jsonify({"message": "Missing username"}), 400)
    
    new_game = Game(
        game_code=int(random.randint(1,1000) * 1000),  # Random game code for simplicity
        player_count=1,
        status=Game.STATUS.CREATED
    )

    new_player = Player(
        username=username,
        host=True,
        game_id=new_game.id,
        position=40,
        number=new_game.player_count - 1
    )

    try:
        new_game.players.append(new_player)
        db.session.add(new_game)
        db.session.add(new_player)
        db.session.commit()
        redirect_url = f'/game/{new_game.id}'
        return jsonify({'status': 'success', 'redirect_url': redirect_url, 'game_code': new_game.game_code, 'game_id': new_game.id, 'player_number': new_player.number}), 201
    except Exception as e:
        return jsonify({"message": str(e)}), 400

@app.route('/api/get_game_state', methods=['GET'])
def get_game_state():
    game_id = request.args['gameId']
    try:
        existing_game = Game.query.filter_by(id=game_id).first()
        if not existing_game:
            return jsonify({"error": "Game not found"}), 404
        return jsonify(existing_game.players), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/get_players', methods=['GET'])
def get_players_for_game():
    game_id = request.args['gameId']
    try:
        existing_game = Game.query.filter_by(id=game_id).first()
        if not existing_game:
            return jsonify({"error": "Game not found"}), 404
       
        player_positions = [
            {"name": p.username, "position": p.position, "chips": []}
            for p in existing_game.players
        ]
        
        return jsonify({
            "turn": existing_game.turn_count % existing_game.player_count,
            "names": player_positions
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
@app.route('/api/join_game', methods=['POST'])
def create_player_join_game():
    data = request.get_json()
    game_code = data.get('gameCode')
    username = data.get('username')    
    position = data.get('position')

    try:
        existing_game = Game.query.filter_by(game_code=game_code).first()
        if not existing_game:
            return jsonify({"error": "Game not found"}), 404
        if existing_game.status != Game.STATUS.CREATED:
            return jsonify({"error": "Game already started"}), 404
        if existing_game.player_count >= 4:
            return jsonify({"error": "Game is full"}), 400
        if existing_game.status != Game.STATUS.CREATED:
            return jsonify({"error": "Game has already started"}), 400
        for player in existing_game.players:
            if player.username == username:
                return jsonify({"error": "Username already taken"}), 400
            
        existing_game.player_count += 1

        hqPositions = [4, 36, 44, 76]
        
        new_player = Player(
            username=username,
            host=False,
            game_id=existing_game.id,
            position=40,
            number=existing_game.player_count - 1
        )
        
        existing_game.players.append(new_player)
        
        db.session.add(new_player)
        db.session.commit()
        redirect_url = f'/game/{existing_game.id}'
        return jsonify({'status': 'success', 'game_id': existing_game.id, 'position': new_player.position, 'player_number': new_player.number, 'redirect_url': redirect_url}), 201
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

def move_validate_helper(source, dest, diceRoll):
    source_col = source % 9
    dest_col = dest % 9 

    source_row = source // 9
    dest_row = dest // 9

    manhattan_distance = abs(dest_row - source_row) + abs(dest_col - source_col)

    if dest not in [10, 11, 12, 14, 15, 16, 19, 20, 21, 23, 24, 25, 28, 29, 30, 31, 32, 33, 46, 47, 48, 50, 51, 52, 55, 56, 57, 59, 60, 61, 64, 65, 66, 68, 69, 70] and manhattan_distance == diceRoll:
        return True
    else:
        return False
        

@app.route('/api/move', methods=['POST'])
def validate_move():
    data = request.get_json()
    
    if not data:
        return jsonify({"error": "Invalid or missing JSON"}), 400

    source = data.get('sourceIndex')
    dest = data.get('destIndex')
    diceRoll = int(data.get("dice"))
    playerNumber = int(data.get("playerNumber"))
    gameId = int(data.get("gameId"))

    if source is None or dest is None:
        return jsonify({"error": "Missing sourceIndex or destIndex"}), 400
    
    existing_game = Game.query.filter_by(id=gameId).first()
    if existing_game.status == Game.STATUS.COMPLETED:
        return jsonify({"error": "Game over"}), 400
    
    if existing_game.status == Game.STATUS.CREATED:
        existing_game.status = Game.STATUS.IN_PROGRESS

    if existing_game.turn_count % existing_game.player_count != playerNumber:
        return jsonify({"error": "Not your turn"}), 400

    try:
        source = int(source)
        dest = int(dest)

        if (move_validate_helper(source, dest, diceRoll) == True):            
            player = Player.query.filter_by(number=playerNumber).first()
            if not player:
                return jsonify({"error": "No player found at source position"}), 404

            player.position = dest

            db.session.commit()
            return jsonify({"message": "Moved successfully"}), 201
        else:
            return jsonify({"error": "Invalid move"}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/question', methods=['GET'])
def get_question_by_category():
    game_id = request.args['gameId']
    existing_game = Game.query.filter_by(id=game_id).first()
    category = request.args['category']
    try:
        questionBank = Question.query.filter_by(category=category).all()
        
        if questionBank:
            question = random.choice(questionBank)
            existing_game.current_question_id = question.id
            json_question = question.to_json()
            return jsonify({"question": json_question}), 201
        else:
            return jsonify({"error": f"No questions found for category={category}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/answer', methods=['POST'])
def process_answer():
    data = request.get_json()
    answer = data.get('playerAnswer')
    playerNumber = int(data.get("playerNumber"))
    question = data.get("playerQuestion")
    gameId = int(data.get("gameId"))
    try:
        existing_game = Game.query.filter_by(id=gameId).first()
        current_question = Question.query.filter_by(question=question).first()

        if current_question.answer == answer:
            return jsonify({"result": "correct"}), 201
        else:
            existing_game.turn_count += 1
            db.session.commit()
            return jsonify({"result": "incorrect"}), 400        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/player', methods=['GET'])
def get_players():
    try:
        players = Player.query.all()
        json_players = list(map(lambda p: p.to_json(), players))
        return jsonify({"players": json_players})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/game', methods=['GET'])
def get_games():
    try:
        games = Game.query.all()
        json_games = list(map(lambda g: g.to_json(), games))
        return jsonify({"games": json_games})
    
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
