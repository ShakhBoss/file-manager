// index.js
const { homedir } = require('os');
const path = require('path');
const readline = require('readline');

const username = process.argv.find(arg => arg.startsWith('--username=')).split('=')[1];
const userHomeDir = homedir();
let currentDir = userHomeDir;

console.log(`Welcome to the File Manager, ${username}!`);
console.log(`You are currently in ${currentDir}`);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', async (input) => {
    const [command, ...args] = input.trim().split(' ');

    switch (command) {
        case '.exit':
            console.log(`Thank you for using File Manager, ${username}, goodbye!`);
            rl.close();
            break;
        case 'up':
            if (currentDir !== userHomeDir) {
                currentDir = path.dirname(currentDir);
                console.log(`You are currently in ${currentDir}`);
            }
            break;
        case 'cd':
            await changeDirectory(args[0]);
            break;
        case 'ls':
            await listFiles();
            break;
        // Other cases for file operations, os operations, etc.
        default:
            console.log('Invalid input');
    }
});

rl.on('close', () => {
    process.exit(0);
});

async function changeDirectory(newPath) {
    const fullPath = path.isAbsolute(newPath) ? newPath : path.join(currentDir, newPath);
    try {
        const stats = await fs.promises.stat(fullPath);
        if (stats.isDirectory()) {
            currentDir = fullPath;
            console.log(`You are currently in ${currentDir}`);
        } else {
            console.log('Invalid input');
        }
    } catch {
        console.log('Operation failed');
    }
}

async function listFiles() {
    try {
        const files = await fs.promises.readdir(currentDir, { withFileTypes: true });
        const directories = files.filter(file => file.isDirectory()).map(file => `${file.name}/`);
        const regularFiles = files.filter(file => file.isFile()).map(file => file.name);
        directories.sort();
        regularFiles.sort();
        console.log([...directories, ...regularFiles].join('\n'));
    } catch {
        console.log('Operation failed');
    }
}
