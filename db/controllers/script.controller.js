const { exec } = require("child_process");

exports.script_hello = (req, res) => {
    exec("bash ./gitScript.sh ", async (error, stdout, stderr) => {
        await res.send(stdout || stderr || error);
    });
}