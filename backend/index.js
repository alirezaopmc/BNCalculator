const express = require('express');
const translate = require('../libs/encryption/translate');
const { solve } = require('./core/bncalculator');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.post('/calculate', function (req, res) {
  //let expression = translate(req.body.exp);
  console.log('Recieved Expression: ' + req.body.exp);
  let ans = solve(req.body.exp);
  console.log('Solved: ' + ans);
  res.send(ans);
});

app.listen(3001, () => {
  console.log(`Server is up on port 3001`);
});
