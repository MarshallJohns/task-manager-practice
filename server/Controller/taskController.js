module.exports = {
    getTasks: async (req, res) => {
        const db = req.app.get('db')
        const { user_id } = req.session.user

        const tasks = await db.get_tasks([user_id])
        res.status(200).send(tasks)
    },
    addTask: async (req, res) => {
        const db = req.app.get('db')
        const { task } = req.body
        const { user_id } = req.session.user

        const tasks = await db.add_task([task, user_id])
        res.status(200).send(tasks)

    },
    deleteTask: async (req, res) => {
        const db = req.app.get('db')
        const { taskId } = req.params
        const { user_id } = req.session.user


        const tasks = await db.delete_task([taskId, user_id])
        res.status(200).send(tasks)
    }
}