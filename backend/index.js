const express = require('express')
const translate = require('../libs/encryption/translate')
const { solve } = require('./core/bncalculator')

const app = express()

app.get('/', function (req, res) {
    let expression = translate(req.query.exp)
    let ans = solve(expression)
    res.json(ans)
})

app.listen(3000)