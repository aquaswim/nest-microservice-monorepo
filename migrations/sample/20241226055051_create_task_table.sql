-- migrate:up
CREATE TABLE IF NOT EXISTS task
(
    "id"          SERIAL PRIMARY KEY,
    "title"       VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NULL,
    "createdAt"   timestamptz default NOW(),
    "updatedAt"   timestamptz default NOW()
);
-- migrate:down
DROP TABLE IF EXISTS task;