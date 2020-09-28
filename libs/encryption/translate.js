const fs = require('fs')

let dictionaryData = fs.readFileSync('dictionary.json')
let dictionary = JSON.parse(dictionaryData)

const translate = (str) => {
    return result = str.split('').map(c => dictionary[c]).join('')
}

module.exports = translate

// console.log(translate('12'))
// console.log(translate('BCLFG'))