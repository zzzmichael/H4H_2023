module.exports = {
    get: function(req, res) {
        const fs = require('fs').promises
        const path = require('path');
        const p = req.url.split('/')
        const publicDirectory = path.join(__dirname,'..','public')

        let filePath = publicDirectory
        for (let i=2; i<p.length; i++) {
            filePath = filePath + '/' + p[i]
        }

        let contentType = req.headers['accept'].split(',')[0]

        fs.readFile(filePath)
        .then((fileData) => {

            res.writeHead(200, {
                'Content-Type': contentType
            });

            res.write(fileData)
            res.end()
        })
        .catch (err => {
            console.log(err)
            if(err.errrno === "ENOENT") {
                res.statusCode = 404
                console.log('404')
                res.end()
            } else {
                res.statusCode = 500
                console.log('500')
                res.end()
            }
        });
    }
}