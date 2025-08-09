from config import db
from random import random
from sqlalchemy import Integer, String, DateTime, ForeignKey
from datetime import datetime

class Question(db.Model):
    __tablename__ = 'questions'

    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String, nullable=False)
    answer = db.Column(db.String, nullable=False)
    category = db.Column(db.String, nullable=False)

    def to_json(self):
        return {
            'id': self.id,
            'question': self.question,
            'answer': self.answer,
            'category': self.category
        }

class Game(db.Model):
    __tablename__ = 'game'

    class STATUS:
        CREATED = 'CREATED' # Initial state when the game is created, but not yet started
        IN_PROGRESS = 'IN_PROGRESS'
        COMPLETED = 'COMPLETED'

    id = db.Column(db.Integer, primary_key=True)
    game_code = db.Column(db.Integer, unique=True, nullable=False)
    date = db.Column(db.DateTime, default=datetime.now())
    player_count = db.Column(db.Integer, default=0)
    status = db.Column(db.String, default=STATUS.CREATED)
    players = db.relationship('Player', backref='game', lazy=True)
    turn_count = db.Column(db.Integer, default=0)

    def to_json(self):
        return {
            'id': self.id,
            'game_code': self.game_code,
            'date': self.date.isoformat(),
            'playerCount': self.player_count,
            'status': self.status,
            'players': [player.to_json() for player in self.players],
            'turnCount': self.turn_count
        }

class Player(db.Model):
    __tablename__ = 'player'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    host = db.Column(db.Boolean, nullable=False, default=False)
    game_id = db.Column(db.Integer, ForeignKey('game.id'), nullable=False)
    position = db.Column(db.Integer, nullable=False)
    number = db.Column(db.Integer, nullable=False)

    def to_json(self):
        return {
            'id': self.id,
            'username': self.username,
            'host': self.host,
            'gameId': self.game_id,
            'position': self.position,
            'number': self.number
        }