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
  console.log('isRemainder: ' + req.body.isRemainder);

  let ans = solve(req.body.exp);

  if (req.body.isRemainder) {
    let nums = req.body.exp.split('/');

    let remainder = nums[0] - ans * nums[1];
    console.log('Solved: ' + ans + ' With remainder: ' + remainder);
    return res.send(ans + 'With the remainder of ' + remainder);
  }
  console.log('Solved: ' + ans);
  res.send(`${ans}`);
});

app.listen(3001, () => {
  console.log(`Server is up on port 3001`);
});
