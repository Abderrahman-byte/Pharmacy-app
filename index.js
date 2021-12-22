const app = require('./src/app')
const dbPool = require('./db')

const PORT = 8000;

const testPoolConnection = async () => {
    try {
        const client = await dbPool.connect()
        client.release()
        console.log('[INFO] connected to database')
        return true
    } catch (err) {
        console.error('[ERROR] couldn\'t connect to database')
        console.error(err)
        return false
    }
}


const startServer = async () => {
    if ( !(await testPoolConnection()) ) return

    const App = app(dbPool)

    App.listen(PORT, (err) => {
        if (err) return console.error(`[ERROR] couldn\'t start the server on ${PORT}\n${err}`)

        console.log(`[INFO] Server is listening on ${PORT}`)
    })
}

startServer()