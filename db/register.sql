INSERT INTO users(first_name, email, hash)
VALUES($1, $2, $3)
RETURNING *;