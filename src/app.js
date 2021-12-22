const express = require('express')

const app = () => {
    const App = express()

    App.get("/", (request, response) => {
        response.json({ message: 'welcome to pharmacy app by abderrahmane elasri.'})
    })

    return App
}

module.exports = app