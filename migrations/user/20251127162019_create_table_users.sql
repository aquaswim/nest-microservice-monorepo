-- migrate:up
CREATE TABLE users
(
    id         SERIAL PRIMARY KEY,
    email      VARCHAR UNIQUE NOT NULL,
    password   VARCHAR NOT NULL,
    first_name VARCHAR NOT NULL,
    last_name  VARCHAR,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
-- migrate:down
DROP TABLE IF EXISTS users;