const http = require('http');
const fs = require('fs');
const path = require('path');
const users = require('./data/users.json')

const server = http.createServer((req, res) => {
    if (req.url === '/' && req.method === "GET") {
        fs.promises.readFile(path.join(__dirname, 'data', 'index.html'), 'utf-8')
            .then((data) => {
                console.log(data, 'a');
                res.writeHead(200, { statusMessage: "OKAY", "Content-Type": "text/html" })
                res.write(data)
                res.end()
            })
            .catch((err) => {
                console.log(err, "esia");
                res.end()
            })
    }
    else if (req.url === '/api/users' && req.method === "GET") {
        fs.promises.readFile(path.join(__dirname, 'data', 'users.json'), 'utf-8')
            .then((data) => {
                res.writeHead(200, { statusMessage: "user db", "Content-Type": "application/json" })
                res.write(data)
                res.end()
            })
            .catch((err) => {
                res.writeHead(404, { statusMessage: "Page Not Found", "Content-Type": "application/json" })
                res.end(JSON.stringify({ message: "page not found" }))
                console.log(err);
            })
    }
    else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === "GET") {
        const id = req.url.split('/')[3]
        const user = users.find((d) => d.id === id);
        
        res.writeHead(200, { statusMessage: "user db", "Content-Type": "application/json" })
        res.write(JSON.stringify(user))
        res.end()

        // fs.promises.readFile(path.join(__dirname, 'data', 'users.json'), 'utf-8')
        //     .then((data) => {
        //         const user = data.find((d) => d.id === id);


        //         res.writeHead(200, { statusMessage: "user db", "Content-Type": "application/json" })
        //         res.write(JSON.stringify(user))
        //         res.end()
        //     })
        //     .catch((err) => {
        //         res.writeHead(404, { statusMessage: "User Not Found", "Content-Type": "application/json" })
        //         res.end(JSON.stringify({ message: "user not found" }))
        //         console.log(err);
        //     })
        // res.end()

    }
    else if (req.url.includes("?") && req.method === "GET") {
        let searchGetParamsIndex = req.url.indexOf('?');
        let getParams = req.url.slice(searchGetParamsIndex + 1)
        let findParams = getParams.split('=')[1]
        let c = users.filter((b) => b.name.indexOf(findParams) > -1)
        console.log(c);



        res.write(JSON.stringify(c))
        res.end()

        /// xi senc chi asxhatum
        // fs.promises.readFile(path.join(__dirname, 'data', 'users.json'), 'utf-8')
        //     .then((data) => {
        //         let newData = data.filter((b) => b.name.indexOf(findParams) > -1)
        //         return newData
        //     })
        //     .then((newData) => {
        //         res.writeHead(200, { statusMessage: "user db", "Content-Type": "application/json" })
        //         res.write(JSON.stringify(newData))
        //         res.end()
        //     })
        //     .catch((err) => {
        //         res.end()
        //     })

    }
    else {
        res.end()
    }
})

server.listen(3003, () => console.log('Server is Running!!!'))