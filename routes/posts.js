module.exports = {
    get: function(req, res) {
        try {
            const p = req.url.split('/')
            const category = p[3]

            res.writeHead(200, {
                'Content-Type': 'application/json'
            });
            
            res.write(JSON.stringify(POSTS[category]))
            res.end()

        } catch {
            res.statusCode = 404
            console.log('404')
            res.end()
        }
    },
    post: function(req, res, body) {
        try {
            const newPost = JSON.parse(body)
            const category = newPost['category'].toLowerCase().trim()
            const user = newPost['user'].toLowerCase().trim()
            const content = newPost['content'].toLowerCase().trim()
            POSTS[category][user] = {
                'content': content
            }
            res.statusCode = 201
            res.end()
        } catch (err) {
            if (err instanceof SyntaxError) {
                console.log("error parsing JSON", err);
                res.statusCode = 400
                return res.end()
            }

            console.log("unkown error", err);
            res.statusCode = 500
            res.end()
        }
    }
}

const POSTS = {
    Social: {},
    Mental: {},
    Physical: {},
    Resources: {}
}