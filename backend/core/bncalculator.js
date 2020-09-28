const { exec } = require("child_process")
const fs = require("fs")

const commandTemple = './a.out '

const solve = (str) => {
    let command = commandTemple + str
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
    fs.writeFileSync('out.json', outString)
}

module.exports = {
    solve,
    save
}

solve('12-23')