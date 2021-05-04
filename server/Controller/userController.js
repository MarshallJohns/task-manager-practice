const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db')
        const { firstName, email, password } = req.body

        const [existingUser] = await db.get_user([email])
        if (existingUser) {
            return res.status(409).send('Email already exists')
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const [newUser] = await db.register([firstName, email, hash])

        delete newUser.hash
        req.session.user = newUser
        res.status(200).send(req.session.user)
    },
    login: async (req, res) => {
        const db = req.app.get('db')
        const { email, password } = req.body
        const [existingUser] = await db.get_user([email])


        if (!existingUser) {
            return res.status(409).send('Email not on records')
        }

        const isAuthenticated = bcrypt.compareSync(password, existingUser.hash)
        if (!isAuthenticated) {
            return res.status(409).send('Email or password incorrect')
        }

        delete existingUser.hash
        req.session.user = existingUser
        res.status(200).send(req.session.user)
    },
    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },
    getUser: async (req, res) => {
        if (!req.session.user) {
            res.status(409).send('Please sign in')
        }

        res.status(200).send(req.session.user)
    }
}