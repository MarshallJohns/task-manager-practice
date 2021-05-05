require('dotenv').config()
const express = require('express')
const massive = require('massive')
const app = express()
const session = require('express-session')
const userCtrl = require('./Controller/userController')
const taskCtrl = require('./Controller/taskController')

const { SESSION_SECRET, CONNECTION_STRING, SERVER_PORT } = process.env

app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookies: { maxAge: 1000 * 60 * 60 * 24 * 365 }
}))

//* Auth Endpoints
app.post('/api/user/register', userCtrl.register)
app.post('/api/user/login', userCtrl.login)
app.delete('/api/user/logout', userCtrl.logout)
app.get('api/user/getuser', userCtrl.getUser)

//*Task Endpoints
app.get('/api/tasks/all', taskCtrl.getTasks)
app.post('/api/tasks/add', taskCtrl.addTask)
app.delete('/api/tasks/:taskId', taskCtrl.deleteTask)

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(dbInstance => {
    app.set('db', dbInstance)
    console.log(`DB Ready`)
    app.listen(SERVER_PORT, () => {
        console.log(`PORT: ${SERVER_PORT}`)
    })
})