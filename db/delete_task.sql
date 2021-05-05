DELETE FROM tasks
WHERE task_id = $1;

SELECT * FROM tasks
WHERE user_id = $2;