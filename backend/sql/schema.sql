-- Application users
CREATE TABLE IF NOT EXISTS users (
    id       SERIAL PRIMARY KEY,
    email    VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Wishlist items belonging to a user
CREATE TABLE IF NOT EXISTS wishlist_items (
    id       SERIAL PRIMARY KEY,
    title    VARCHAR(255)   NOT NULL,
    price    NUMERIC(10, 2) NOT NULL,
    priority VARCHAR(20)    NOT NULL,
    status   VARCHAR(20)    NOT NULL,
    user_id  INTEGER REFERENCES users(id)
);
