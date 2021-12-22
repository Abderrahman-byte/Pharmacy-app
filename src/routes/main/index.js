const express = require('express')

const { HomePage } = require('../../controllers/main')

const MainRouter = express.Router()

MainRouter.get('/', HomePage)

module.exports = MainRouter