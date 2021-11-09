const prom = require('fs/promises');
const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');
const { lstatSync } = require('fs');

const showData = async (pathData) => {
    if (lstatSync(pathData).isDirectory()) {
        return await prom.readdir(pathData);
    } else {
        return await prom.readFile(pathData, 'utf-8');
    }
};

const server = http.createServer(async (req, res) => {
    const queryParams = url.parse(req.url, true).query;

    let filePath = '';

    if (req.url === '/' || req.url === '/index.js') {

        filePath = req.url === '/' ?
            path.join(__dirname, './index.html') :
            path.join(__dirname, './index.js');

        const readStream = fs.createReadStream(filePath);
        res.writeHead(200, 'OK', {
            'Content-Type': 'text/html',
        })
        readStream.pipe(res);

    } else {
        console.log(queryParams.path);
        filePath = path.join(__dirname, queryParams.path);
        res.writeHead(200, 'OK', {
            'Content-Type': 'json/html',
        })
        let data = await showData(filePath);
        res.end(JSON.stringify(data));
    }
});
server.listen(3000);