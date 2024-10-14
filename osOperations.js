// osOperations.js
const os = require('os');

function getEOL() {
    console.log(`EOL: ${JSON.stringify(os.EOL)}`);
}

function getCPUs() {
    const cpus = os.cpus();
    cpus.forEach((cpu, index) => {
        console.log(`CPU ${index + 1}: ${cpu.model}, Speed: ${cpu.speed / 1000} GHz`);
    });
}

function getHomeDir() {
    console.log(`Home Directory: ${os.homedir()}`);
}

function getUsername() {
    console.log(`System Username: ${os.userInfo().username}`);
}

function getArch() {
    console.log(`Architecture: ${os.arch()}`);
}

module.exports = { getEOL, getCPUs, getHomeDir, getUsername, getArch };
