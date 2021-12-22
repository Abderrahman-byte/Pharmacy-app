const express = require('express')
const expressSession = require('express-session')
const pgConnectSession = require('connect-pg-simple')(expressSession)

require('dotenv').config()

const MainRouter = require('./routes/main')
const apiRouter = require('./controllers/api')
const { Authentication } = require('./middlewares/Authentication')

const app = (pool) => {
    const App = express()

    App.use(express.json())

    App.use(expressSession({
        store: new pgConnectSession({
            createTableIfMissing: true,
            tableName: 'sessions',
            pool,
        }),
        saveUninitialized: false,
        resave: false,
        secret: process.env.SECRET_STUFF,
        name: 'sessionid',
        cookie: { maxAge: 3600000 * 24 * 30 }
    }))

    App.use(Authentication(pool))
    App.use('/', MainRouter)
    App.use('/api', apiRouter(pool))

    return App
}

module.exports = app