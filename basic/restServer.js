const http = require('http');
const fs = require('fs').promises;

http.createServer(async (req, res) => {
    try {
        console.log(req.method, req.url);
        if(req.method === 'GET') {
            if(req.url === '/') {
                const data = await fs.readFile('./web/html/restFront.html');
                res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
                return res.end(data);
            } else if (req.url === '/about') {
                const data = await fs.readFile('./web/html/about.html');
                res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
                return res.end(data);
            }
            try {
                const data = await fs.readFile('.${req.url}');
                return res.end(data);
            } catch (err) {
                console.log(err);
            }
        }

        res.writeHead(404);
        return res.end('NOT FOUND');
    } catch (err) {
        console.log(err);
        res.writeHead(500, {'Content-Type' : 'text/plain; charset=utf-8'});
        return res.end('NOT FOUND');
    }
})

.listen(8082, () => {
    console.log('8082 rest Example port listener');
})