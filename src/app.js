const express = require('express')

const MainRouter = require('./routes/main')
const apiRouter = require('./controllers/api')

const app = (pool) => {
    const App = express()

    App.use('/', MainRouter)
    App.use('/api', apiRouter(pool))

    return App
}

module.exports = app