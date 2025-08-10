CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT NOT NULL,
    mediaUrl TEXT
);

INSERT INTO questions (question, answer, category) VALUES ('Who was the first President of the United States?', 'george washington', 'History');
INSERT INTO questions (question, answer, category) VALUES ('In what country can you find the Great Wall?', 'china', 'History');
INSERT INTO questions (question, answer, category) VALUES ('The pyramids are found in which country?', 'egypt', 'History');
INSERT INTO questions (question, answer, category) VALUES ('Who sailed across the Atlantic Ocean in 1492?', 'christopher columbus', 'History');
INSERT INTO questions (question, answer, category) VALUES ('What is the capital of the United States?', 'washington dc', 'History');
INSERT INTO questions (question, answer, category) VALUES ('What year do we celebrate America’s birthday?', '1776', 'History');
INSERT INTO questions (question, answer, category) VALUES ('Who freed the slaves in the United States?', 'abraham lincoln', 'History');
INSERT INTO questions (question, answer, category) VALUES ('The Statue of Liberty was a gift from which country?', 'france', 'History');
INSERT INTO questions (question, answer, category) VALUES ('What is the name of the ship the Pilgrims came on?', 'mayflower', 'History');
INSERT INTO questions (question, answer, category) VALUES ('Who was the first man to walk on the moon?', 'neil armstrong', 'History');
INSERT INTO questions (question, answer, category) VALUES ('Which war was fought between the North and South in the U.S.?', 'civil war', 'History');
INSERT INTO questions (question, answer, category) VALUES ('What do we call the first people who lived in America?', 'native americans', 'History');
INSERT INTO questions (question, answer, category) VALUES ('Who is known as the father of our country?', 'george washington', 'History');
INSERT INTO questions (question, answer, category) VALUES ('Which country did the United States gain independence from?', 'england', 'History');
INSERT INTO questions (question, answer, category) VALUES ('What famous document begins with "We the People"?', 'constitution', 'History');

INSERT INTO questions (question, answer, category) VALUES ('What planet do we live on?', 'earth', 'Science');
INSERT INTO questions (question, answer, category) VALUES ('What do bees make?', 'honey', 'Science');
INSERT INTO questions (question, answer, category) VALUES ('What gas do we breathe in to live?', 'oxygen', 'Science');
INSERT INTO questions (question, answer, category) VALUES ('What gas do plants need to live?', 'carbon dioxide', 'Science');
INSERT INTO questions (question, answer, category) VALUES ('How many legs does an insect have?', 'six', 'Science');
INSERT INTO questions (question, answer, category) VALUES ('What do you call water when it turns into ice?', 'solid', 'Science');
INSERT INTO questions (question, answer, category) VALUES ('What force pulls things toward the ground?', 'gravity', 'Science');
INSERT INTO questions (question, answer, category) VALUES ('What star is at the center of our solar system?', 'sun', 'Science');
INSERT INTO questions (question, answer, category) VALUES ('What is the largest planet in our solar system?', 'jupiter', 'Science');
INSERT INTO questions (question, answer, category) VALUES ('Which part of the plant makes food?', 'leaf', 'Science');
INSERT INTO questions (question, answer, category) VALUES ('What is the hard outer shell of an egg called?', 'shell', 'Science');
INSERT INTO questions (question, answer, category) VALUES ('What do humans need to drink to survive?', 'water', 'Science');
INSERT INTO questions (question, answer, category) VALUES ('What do fish use to breathe underwater?', 'gills', 'Science');
INSERT INTO questions (question, answer, category) VALUES ('What do we call baby frogs?', 'tadpoles', 'Science');
INSERT INTO questions (question, answer, category) VALUES ('What kind of animal is a whale?', 'mammal', 'Science');

INSERT INTO questions (question, answer, category) VALUES ('What do we call someone who paints pictures?', 'artist', 'Arts');
INSERT INTO questions (question, answer, category) VALUES ('What primary color do you get if you mix red and yellow?', 'orange', 'Arts');
INSERT INTO questions (question, answer, category) VALUES ('What do you call a short play or story acted on stage?', 'drama', 'Arts');
INSERT INTO questions (question, answer, category) VALUES ('Which musical instrument has black and white keys?', 'piano', 'Arts');
INSERT INTO questions (question, answer, category) VALUES ('What do we call a book that has many pictures and few words?', 'picture book', 'Arts');
INSERT INTO questions (question, answer, category) VALUES ('What do we call the person who writes a book?', 'author', 'Arts');
INSERT INTO questions (question, answer, category) VALUES ('What do we call a song with no singing?', 'instrumental', 'Arts');
INSERT INTO questions (question, answer, category) VALUES ('What shape has three sides?', 'triangle', 'Arts');
INSERT INTO questions (question, answer, category) VALUES ('What kind of art is made with clay?', 'sculpture', 'Arts');
INSERT INTO questions (question, answer, category) VALUES ('Which art form uses dancing?', 'ballet', 'Arts');
INSERT INTO questions (question, answer, category) VALUES ('What do you call the person who takes photos?', 'photographer', 'Arts');
INSERT INTO questions (question, answer, category) VALUES ('What is the opposite of dark in art?', 'light', 'Arts');
INSERT INTO questions (question, answer, category) VALUES ('What do we call drawings made with pencils?', 'sketch', 'Arts');
INSERT INTO questions (question, answer, category) VALUES ('What do we call a group of people singing together?', 'choir', 'Arts');
INSERT INTO questions (question, answer, category) VALUES ('What do you call the colors red, blue, and yellow?', 'primary colors', 'Arts');

INSERT INTO questions (question, answer, category) VALUES ('In which sport do you dribble a ball and shoot hoops?', 'basketball', 'Sports');
INSERT INTO questions (question, answer, category) VALUES ('In baseball, how many bases are there?', 'four', 'Sports');
INSERT INTO questions (question, answer, category) VALUES ('In soccer, what is the main object you kick?', 'ball', 'Sports');
INSERT INTO questions (question, answer, category) VALUES ('What sport uses rackets and a shuttlecock?', 'badminton', 'Sports');
INSERT INTO questions (question, answer, category) VALUES ('In which sport do you try to knock down pins with a ball?', 'bowling', 'Sports');
INSERT INTO questions (question, answer, category) VALUES ('In swimming, what do you wear on your feet?', 'nothing', 'Sports');
INSERT INTO questions (question, answer, category) VALUES ('What sport is played on ice with a puck?', 'hockey', 'Sports');
INSERT INTO questions (question, answer, category) VALUES ('What sport uses a bat and ball and has innings?', 'baseball', 'Sports');
INSERT INTO questions (question, answer, category) VALUES ('In soccer, what position stops the ball from going in the net?', 'goalkeeper', 'Sports');
INSERT INTO questions (question, answer, category) VALUES ('Which sport uses a net, a ball, and is played in water?', 'water polo', 'Sports');
INSERT INTO questions (question, answer, category) VALUES ('What sport uses a net, ball, and is played on sand?', 'beach volleyball', 'Sports');
INSERT INTO questions (question, answer, category) VALUES ('What sport has a hoop and is played indoors or outdoors?', 'basketball', 'Sports');
INSERT INTO questions (question, answer, category) VALUES ('In baseball, how many players are on the field for one team?', 'nine', 'Sports');
INSERT INTO questions (question, answer, category) VALUES ('In track and field, what race is the shortest?', 'sprint', 'Sports');
INSERT INTO questions (question, answer, category) VALUES ('In tennis, what is the score when both players have zero?', 'love', 'Sports');