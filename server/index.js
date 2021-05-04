require('dotenv').config()
const express = require('express')
const massive = require('massive')
const app = express()
const userCtrl = require('./Controller/userController')

const { SESSION_SECRET, CONNECTION_STRING, SERVER_PORT } = process.env

app.use(express.json())

app.post('/api/user/register', userCtrl.register)


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