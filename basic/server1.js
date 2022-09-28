const http = require('http');
const fs = require('fs').promises;
http.createServer(async (req, res) => {
    try {
        const data = await fs.readFile('./web/basicHtml.html');
        res.writeHead(200, {'Content-type' : 'text/html; charset=utf-8'});
        res.end(data);
    } catch (err) {
        console.err(err.data);
        res.writeHead(200, {'Content-type' : 'text/plain; charset=utf-8'});
        res.end(err.data);
    }
})

.listen(
    8081, () => {
        console.log('noe js server port 8081');
    }
)