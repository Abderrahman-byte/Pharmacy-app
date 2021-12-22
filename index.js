const app = require('./src/app')

const PORT = 8000;

const startServer = () => {
    const App = app()

    App.listen(PORT, (err) => {
        if (err) return console.error(`[ERROR] couldn\'t start the server on ${PORT}\n${err}`)

        console.log(`[INFO] Server is listening on ${PORT}`)
    })
}

startServer()