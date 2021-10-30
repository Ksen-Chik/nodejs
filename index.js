const fs = require('fs');
const readline = require('readline');
const ACCESS_LOG = './miniaccess.log';

const ips = ['89.123.1.41', '34.48.240.111'];

let writeStreams = ips.map((ip) => {
    return fs.createWriteStream(`./${ip}_requests.log`, {
        flags: 'w', encoding: 'utf8'});
});

const rl = readline.createInterface({
    input: fs.createReadStream(ACCESS_LOG),
    output: process.stdout,
    terminal: false
});

rl.on('line', (line) => {
    for (let i = 0; i < ips.length; i++) {
        if (line.toString().startsWith(ips[i])) {
            writeStreams[i].write(line.toString() + "\n");
        }
    }
});