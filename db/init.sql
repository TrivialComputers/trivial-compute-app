CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT NOT NULL,
    mediaUrl TEXT
);

INSERT INTO questions (question, answer, category)
VALUES ('What is the answer to life?', '42', 'Philosophy');

INSERT INTO questions (question, answer, category)
VALUES ('History test?', 'test', 'History');

INSERT INTO questions (question, answer, category)
VALUES ('Science test?', 'test', 'Science');

INSERT INTO questions (question, answer, category)
VALUES ('Arts test?', 'test', 'Arts');

INSERT INTO questions (question, answer, category)
VALUES ('Sports test?', 'test', 'Sports');