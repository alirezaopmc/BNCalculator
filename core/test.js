const { exec } = require("child_process");

exec("./a.out 43-2", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`)
        return
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`)
        return
    }
    console.log(`stdout: ${stdout}`)
})