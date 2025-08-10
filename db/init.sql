CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category TEXT NOT NULL,
    mediaUrl TEXT
);

INSERT INTO questions (question, answer, category) VALUES
('Who was the first President of the United States?', 'George Washington', 'History'),
('What year did the United States declare independence?', '1776', 'History'),
('What is the name of the ship that carried the Pilgrims to America?', 'Mayflower', 'History'),
('Which country built the Great Wall?', 'China', 'History'),
('Who was Abraham Lincoln?', 'The 16th President of the United States', 'History'),
('What do we celebrate on July 4th?', 'Independence Day', 'History'),
('What famous leader said “I have a dream” in 1963?', 'Martin Luther King Jr.', 'History'),
('What is the capital city of the United States?', 'Washington, D.C.', 'History'),
('Who was the first man to walk on the Moon?', 'Neil Armstrong', 'History'),
('What ancient civilization built pyramids in Egypt?', 'The Egyptians', 'History'),
('Who was known as the “Maid of Orléans”?', 'Joan of Arc', 'History'),
('What was the name of Christopher Columbus’s flagship ship?', 'Santa María', 'History'),
('What Native American woman helped Lewis and Clark?', 'Sacagawea', 'History'),
('Who wrote the Declaration of Independence?', 'Thomas Jefferson', 'History'),
('What is the Liberty Bell a symbol of?', 'Freedom', 'History');

INSERT INTO questions (question, answer, category) VALUES
('What planet do we live on?', 'Earth', 'Science'),
('What gas do people need to breathe?', 'Oxygen', 'Science'),
('What force pulls us toward the ground?', 'Gravity', 'Science'),
('Which planet is known as the Red Planet?', 'Mars', 'Science'),
('What do plants need from the Sun to make food?', 'Sunlight', 'Science'),
('What do bees make?', 'Honey', 'Science'),
('How many legs does a spider have?', '8', 'Science'),
('What is the largest mammal in the ocean?', 'Blue whale', 'Science'),
('What is H2O another name for?', 'Water', 'Science'),
('What do we call frozen water?', 'Ice', 'Science'),
('What part of the plant is usually underground?', 'Roots', 'Science'),
('What star is at the center of our solar system?', 'The Sun', 'Science'),
('What do you call baby frogs?', 'Tadpoles', 'Science'),
('What color is chlorophyll?', 'Green', 'Science'),
('What tool do we use to look at stars and planets?', 'Telescope', 'Science');

INSERT INTO questions (question, answer, category) VALUES
('What three primary colors can be mixed to make other colors?', 'Red, Blue, Yellow', 'Arts'),
('What do you call the person who paints pictures?', 'Artist', 'Arts'),
('What is the art of folding paper into shapes called?', 'Origami', 'Arts'),
('What do you call a short song for children?', 'Nursery rhyme', 'Arts'),
('Who painted the Mona Lisa?', 'Leonardo da Vinci', 'Arts'),
('What do actors perform on?', 'A stage', 'Arts'),
('What is the art of making up stories and acting them out?', 'Drama', 'Arts'),
('What instrument has black and white keys?', 'Piano', 'Arts'),
('What do you call the pictures in a book?', 'Illustrations', 'Arts'),
('What is the word for drawing quickly to capture an idea?', 'Sketch', 'Arts'),
('What kind of paint is mixed with water?', 'Watercolor', 'Arts'),
('What do you call a group of people singing together?', 'Choir', 'Arts'),
('What is the name for the part of a song you sing over and over?', 'Chorus', 'Arts'),
('What is the art of shaping clay into pots and bowls?', 'Pottery', 'Arts'),
('What do we call a person who writes music?', 'Composer', 'Arts');

INSERT INTO questions (question, answer, category) VALUES
('In soccer, what is it called when you score a point?', 'Goal', 'Sports'),
('What sport uses a hoop and a ball you bounce?', 'Basketball', 'Sports'),
('In baseball, how many bases are there?', '4', 'Sports'),
('What do you hit a tennis ball with?', 'Racket', 'Sports'),
('In football, what do you call the area you run into to score?', 'End zone', 'Sports'),
('What sport do you swim, bike, and run in?', 'Triathlon', 'Sports'),
('In bowling, how many pins do you try to knock down?', '10', 'Sports'),
('What sport has a net, a shuttlecock, and rackets?', 'Badminton', 'Sports'),
('In hockey, what is the small round object players hit?', 'Puck', 'Sports'),
('What sport is played at Wimbledon?', 'Tennis', 'Sports'),
('In gymnastics, what do you call a full spin in the air?', 'Somersault', 'Sports'),
('What sport uses a bat, ball, and gloves?', 'Baseball', 'Sports'),
('In basketball, how many points is a free throw worth?', '1', 'Sports'),
('What sport do you need skates and ice for?', 'Ice hockey', 'Sports'),
('In soccer, what part of your body can’t you use to touch the ball?', 'Hands', 'Sports');