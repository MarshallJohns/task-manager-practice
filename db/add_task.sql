INSERT INTO tasks(task, user_id)
VALUES ($1, $2);

SELECT * FROM tasks
WHERE user_id = $2;