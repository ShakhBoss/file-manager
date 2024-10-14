// hashOperations.js
const crypto = require('crypto');
const fs = require('fs');

function calculateHash(filePath) {
    const hash = crypto.createHash('sha256');
    const stream = fs.createReadStream(filePath);
    stream.on('data', (chunk) => hash.update(chunk));
    stream.on('end', () => {
        console.log(`Hash: ${hash.digest('hex')}`);
    });
    stream.on('error', () => console.log('Operation failed'));
}

module.exports = { calculateHash };
