BEGIN;  -- Start a transaction

-- Clear existing data
TRUNCATE TABLE Orders CASCADE;
TRUNCATE TABLE Users CASCADE;
TRUNCATE TABLE Books CASCADE;

-- Reset Sequences
ALTER SEQUENCE users_id_seq RESTART WITH 1;
ALTER SEQUENCE books_id_seq RESTART WITH 1;

-- Seed Books Table with Initial Data
INSERT INTO Books (title, author, genre, description, price) VALUES
('Cognitive Therapy and the Emotional Disorders', 'Aaron Beck', 'Psychology', 'A book on cognitive therapy', 19.99),
('The Psychology of Intelligence', 'Jean Piaget', 'Psychology', 'A book on intelligence psychology', 24.99),
('Childhood and Society', 'Erik Erikson', 'Sociology', 'A book on childhood sociology', 15.99),
('Behaviorism', 'John B. Watson', 'Psychology', 'A book on behaviorism', 18.99),
('Social Learning Theory', 'Albert Bandura', 'Education', 'A book on social learning theory', 21.99),
('Sons and Lovers', 'D.H. Lawrence', 'Fiction', 'A fictional book', 12.99),
('Adventures of Huckleberry Finn', 'Mark Twain', 'Fiction', 'A classic fiction', 9.99),
('The Road to Serfdom', 'Friedrich Hayek', 'Economics', 'A book on economics', 22.99),
('Human Action', 'Ludwig von Mises', 'Economics', 'A book on human economics', 25.99),
('Basic Economics', 'Thomas Sowell', 'Economics', 'A book on basic economics', 19.99),
('Fight Club', 'Chuck Palahniuk', 'Fiction', 'A fictional book', 11.99),
('Supernormal Stimuli', 'Niko Tinbergen', 'Psychology', 'A book on psychology', 23.99),
('The Moral Animal', 'Robert Wright', 'Ethics', 'A book on morality', 16.99),
('Thus Spoke Zarathustra', 'Friedrich Nietzsche', 'Philosophy', 'A book on philosophy', 20.99);

-- Seed Users Table with Initial Data
INSERT INTO Users (email, password, username) VALUES
('user1@email.com', 'hashed_password1', 'user1'),
('user2@email.com', 'hashed_password2', 'user2');

-- Seed Orders Table with Initial Data
INSERT INTO Orders (user_id, book_id, quantity, total_price) VALUES
(1, 1, 2, 39.98),
(1, 3, 1, 22.50),
(2, 2, 1, 15.99),
(2, 5, 3, 61.50);

COMMIT;  -- Commit the transaction
