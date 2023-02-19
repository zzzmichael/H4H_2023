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
            const processedBody = body.toString().split('=')[1].split('+').join(' ')
            const newPost = {'userId': "exampleUser",
                            'content': processedBody}
            const category = 'feedPH'
            //const user = newPost['user'].toLowerCase().trim()
            //const content = newPost['content'].toLowerCase().trim()
            fs.readFile('./public/posts.json', (err, data) => {
                console.log(data);
                const postStruct = JSON.parse(data);
                console.log(postStruct[category]);
                //postStruct.forEach((cat) => {  });
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
