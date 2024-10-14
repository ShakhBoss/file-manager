// fileOperations.js
const fs = require('fs');
const path = require('path');

async function readFile(filePath) {
    const fullPath = path.resolve(filePath);
    const readStream = fs.createReadStream(fullPath, 'utf-8');
    readStream.on('data', (chunk) => {
        process.stdout.write(chunk);
    });
    readStream.on('error', () => {
        console.log('Operation failed');
    });
}

async function addFile(fileName) {
    const fullPath = path.join(currentDir, fileName);
    fs.promises.writeFile(fullPath, '')
        .then(() => console.log('File created'))
        .catch(() => console.log('Operation failed'));
}

async function renameFile(filePath, newFileName) {
    const oldPath = path.resolve(filePath);
    const newPath = path.join(path.dirname(oldPath), newFileName);
    try {
        await fs.promises.rename(oldPath, newPath);
        console.log('File renamed');
    } catch {
        console.log('Operation failed');
    }
}

async function copyFile(sourcePath, destDir) {
    const fullSourcePath = path.resolve(sourcePath);
    const destPath = path.join(path.resolve(destDir), path.basename(fullSourcePath));
    const readStream = fs.createReadStream(fullSourcePath);
    const writeStream = fs.createWriteStream(destPath);

    readStream.on('error', () => console.log('Operation failed'));
    writeStream.on('error', () => console.log('Operation failed'));

    readStream.pipe(writeStream);
}

async function moveFile(sourcePath, destDir) {
    try {
        await copyFile(sourcePath, destDir);
        await fs.promises.unlink(sourcePath);
        console.log('File moved');
    } catch {
        console.log('Operation failed');
    }
}

async function deleteFile(filePath) {
    const fullPath = path.resolve(filePath);
    try {
        await fs.promises.unlink(fullPath);
        console.log('File deleted');
    } catch {
        console.log('Operation failed');
    }
}

module.exports = { readFile, addFile, renameFile, copyFile, moveFile, deleteFile };
