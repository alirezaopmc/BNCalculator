const { execSync } = require("child_process")
const fs = require("fs")

const solve = (str) => {
    let command = `${__dirname}/./a.out '${str}'`
    
    const result = execSync(command).toString().replace('\n', '')
    
    return result
}

module.exports = {
    solve
}

// console.log(solve('13*2'))
// console.log(load())