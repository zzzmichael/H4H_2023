module.exports = {
    readBody: function (request) {
      return new Promise(function (resolve) {
        let body = [];
        request
          .on("data", (chunk) => {
            body.push(chunk);
          })
          .on("end", () => {
            resolve(Buffer.concat(body).toString());
          });
      });
    },
  };
  