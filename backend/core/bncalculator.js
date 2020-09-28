const { execSync } = require("child_process")
const fs = require("fs")

const solve = (str) => {
    let command = `${__dirname}/./a.out '${str}'`
    console.log(command)
    const result = execSync(command).toString().replace('\n', '')
    console.log(`result = ${result}`)
    return result
}

module.exports = {
    solve,
    // save,
    // load
}

// console.log(solve('13*2'))
// console.log(load())