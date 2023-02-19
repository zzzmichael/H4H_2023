const http = require('http')

const requestRouter = function(req, res) {
    const method = req.method.toLowerCase()
    const p = req.url.split('/')
    const folder = '/' + p[1]
    console.log(p)


    if (routes.hasOwnProperty(folder)) {
        if (routes[folder][method]) {
            routes[folder][method](req, res);
        } else {
            res.statusCode = 405
            res.end()
        }
    } else {
        res.statusCode = 404
        res.end()
    }
}

const server = http.createServer(requestRouter)
server.listen(2222);

const PublicHandler = require('./routes/public.js')

const routes = {
    '/public': PublicHandler
}