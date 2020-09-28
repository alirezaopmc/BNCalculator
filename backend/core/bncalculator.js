const { exec } = require("child_process")
const fs = require("fs")

const solve = (str) => {
    let command = `${__dirname}/./a.out '${str}'`
    console.log(command)
    const out = exec(command, (error, stdout, stderr) => {
        console.log(`stdout: ${stdout}`)
        let out = {
            value: stdout
        }
        save(out)
    })
    return out
}

const save = (out) => {
    let outString = JSON.stringify(out).replace('\\n', '')
    fs.writeFileSync(__dirname + '/out.json', outString)
}

const load = () => {
    let inString
    let path = `${__dirname}/out.json`
    return require(path)
}

module.exports = {
    solve,
    save,
    load
}

// solve('13*2')
// console.log(load())