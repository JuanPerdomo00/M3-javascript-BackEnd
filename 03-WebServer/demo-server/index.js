const http = require('http')
const fs = require('fs')

http.createServer((req, res) => {
    if(req.url === "/users"){
        res.writeHead(200, {"Content-type" : "application/json"})

        const users = [
            {id: 1, name: 'Manu'},
            {id: 2, name: 'Martin'},
            {id: 3, name: 'Lilieth'},
        ]

        res.end(JSON.stringify(users))
    }
    if(req.url === "/post"){
        res.writeHead(200, {"Content-type" : "text/html"})

        let miHtml = fs.readFileSync('./nombre.html', 'utf-8')
        const name = 'Lisandro'

        miHtml = miHtml.replace('{nombre}', name)

        res.end(miHtml)
    }
    else{
        res.writeHead(404, {"Content-type" : "text/html"})

        const mandoHtml = fs.readFileSync('./index.html')

        res.end(mandoHtml)
    }
}).listen(5050, 'localhost')