INSERT INTO Books (title, author, genre, description, price) VALUES
('Cognitive Therapy and the Emotional Disorders', 'Aaron Beck', 'Psychology', 'A foundational book on cognitive therapy.', 19.99),
('The Psychology of Intelligence', 'Jean Piaget', 'Psychology', 'An exploration into the nature of intelligence.', 15.99),
('Childhood and Society', 'Erik Erikson', 'Psychology', 'A deep dive into the social and emotional development of children.', 22.50),
('Behaviorism', 'John B. Watson', 'Psychology', 'An introduction to the theory of behaviorism.', 18.00),
('Social Learning Theory', 'Albert Bandura', 'Psychology', 'Explores how people learn from observing others.', 20.50);

INSERT INTO Users (email, password, username) VALUES
('user1@email.com', 'hashed_password1', 'user1'),
('user2@email.com', 'hashed_password2', 'user2');

INSERT INTO Orders (user_id, book_id, quantity, total_price) VALUES
(1, 1, 2, 39.98),
(1, 3, 1, 22.50),
(2, 2, 1, 15.99),
(2, 5, 3, 61.50);