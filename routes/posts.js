module.exports = {
    // get: function(req, res) {
    //     try {
    //         const fs = require('fs')
    //         fs.readFile('./public/posts.json')
    //         .then((data) => {
    //             res.writeHead(200, {
    //                 'Content-Type': 'application/json'
    //             });
    //             console.log(data)
    //             res.write(data)
    //             res.end()
    //         })
    //     } catch {
    //         res.statusCode = 404
    //         console.log('404')
    //         res.end()
    //     }
    // },
    post: function(req, res, body) {
        try {
            const fs = require('fs')
            console.log(body)
            const processedBody = body.toString().split('&')
            const user = processedBody[0].split('=')[1].split('+').join(' ')
            const content =  processedBody[1].split('=')[1].split('+').join(' ')
            const newPost = {'userId': user,
                            'content': content}
            const category = 'feedPH'
            fs.readFile('./public/posts.json', (err, data) => {
                const postStruct = JSON.parse(data);
                console.log(postStruct[category]);
                
                postStruct[category].push(newPost);

                console.log(postStruct);
                const formattedJSON = JSON.stringify(postStruct, null, 4);
                console.log(formattedJSON);
                fs.writeFile('./public/posts.json', formattedJSON, err => {
                    if(err) {
                        console.log(err)
                    }
                });
                res.statusCode = 201
                res.end()
            })

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
