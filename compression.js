// compression.js
const fs = require('fs');
const zlib = require('zlib');

function compressFile(sourcePath, destPath) {
    const readStream = fs.createReadStream(sourcePath);
    const writeStream = fs.createWriteStream(destPath);
    const brotli = zlib.createBrotliCompress();

    readStream.pipe(brotli).pipe(writeStream);
    writeStream.on('finish', () => console.log('File compressed'));
    writeStream.on('error', () => console.log('Operation failed'));
}

function decompressFile(sourcePath, destPath) {
    const readStream = fs.createReadStream(sourcePath);
    const writeStream = fs.createWriteStream(destPath);
    const brotli = zlib.createBrotliDecompress();

    readStream.pipe(brotli).pipe(writeStream);
    writeStream.on('finish', () => console.log('File decompressed'));
    writeStream.on('error', () => console.log('Operation failed'));
}

module.exports = { compressFile, decompressFile };
