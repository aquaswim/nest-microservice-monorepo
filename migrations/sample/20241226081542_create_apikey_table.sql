-- migrate:up
CREATE TABLE IF NOT EXISTS api_key
(
    "key"  VARCHAR(255) PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL
);

-- migrate:down
DROP TABLE IF EXISTS api_key;

