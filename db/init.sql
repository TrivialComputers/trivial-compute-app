CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT NOT NULL,
    mediaUrl TEXT
);

INSERT INTO questions (question, answer, category)
VALUES ('What is the answer to life?', '42', 'Philosophy');

