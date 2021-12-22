const express = require('express')

const MainRouter = require('./routes/main')

const app = () => {
    const App = express()

    App.get("/", MainRouter)

    return App
}

module.exports = app