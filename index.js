const http = require('http')
const utils = require('./utils.js')

const requestRouter = function(req, res) {
    const method = req.method.toLowerCase()
    const p = req.url.split('/')
    let folder = '/' + p[1]
    console.log(method, p)

    if (folder == '/api') {
        folder = folder + '/' + p[2]
    }

    if (routes.hasOwnProperty(folder)) {
        if (method === 'get') {
            routes[folder][method](req, res);
        } else if (method === 'post') {
            utils.readBody(req).then(function(body) {
                routes[folder][method](req, res, body);
            });
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
const PostsHandler = require('./routes/posts.js')

const routes = {
    '/public': PublicHandler,
    '/api/posts': PostsHandler
}