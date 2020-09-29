const fs = require('fs')

let dictionary = require('./dictionary')
// let dictionary = JSON.parse(dictionaryData)

const translate = (str) => {
    return result = str.split('').map(c => dictionary[c]).join('')
}

module.exports = translate

// console.log(translate('12'))
// console.log(translate('BCLFG'))