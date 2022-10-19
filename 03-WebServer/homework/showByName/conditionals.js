let fs = require("fs");

// console.log(http)
// function archivo(img) {

//   console.log(htmlR + "yp");
//   return htmlR;
// }

function verificPath(url, req, res) {
  fs.readFile(`${__dirname}/images${url}_doge.jpg`, (err, data) => {
    if (err) {
      console.log(err + "soy error");
      res.writeHead(404, {
        "Content-tpye": "text/html",
      });

      res.end("<h1 >No encontrado - 404</h1>");
    }

    if (url === "/") {
      res.writeHead(200, { "Content-type": "application/json" });
      res.end(
        JSON.stringify({
          mensaje: "Welcome to page",
          path: [
            "/arcoiris",
            "/badboy",
            "/code",
            "/resaca",
            "/retrato",
            "/sexy",
          ],
        })
      );
    }
    if (url) {
      res.writeHead(200, {
        "Content-tpye": "image/jpg",
      });

      res.end(data);
    }
  });
}

module.exports = {
  verificPath,
};
