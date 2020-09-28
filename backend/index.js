const express = require('express')

const app = express()

app.get('/', function (req, res) {
    res.json(req.query)
    console.log(req.query)
})

app.listen(3000)