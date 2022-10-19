const fs = require("fs");
const { beatles } = require("./data");

function routes(req, res, url, method) {
  const pathArr = url.split("/");
  if (method === "GET" && url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    const html = fs.readFileSync("./index.html", "utf-8");
    res.write(html);
    res.end();
  } else if (method === "GET" && pathArr.length === 2) {
    const beatle = beatles.find(
      (abeatle) => encodeURI(abeatle.name) === pathArr[1]
    );
    if (beatle) {
      console.log(pathArr);
      res.writeHead(200, { "Content-Type": "text/html" });
      const html = fs
        .readFileSync("./beatle.html", "utf-8")
        .replaceAll("{name}", beatle.name)
        .replaceAll("{birthdate}", beatle.birthdate)
        .replaceAll("{profilePic}", beatle.profilePic);
      res.write(html);
      return res.end();
    }
  } else if (method === "GET" && url === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    return res.end(JSON.stringify(beatles));
  } else if (method === "GET" && pathArr.length === 3 && pathArr[1] === "api") {
    const beatle = beatles.find(
      (abeatle) => encodeURI(abeatle.name) === pathArr[2]
    );

    if (beatle) {
      console.log(pathArr);
      res.writeHead(200, { "Content-type": "application/json" });
      return res.end(JSON.stringify(beatle));
    }
  }
  res.writeHead(404, { "Content-Type": "text/html" });
  res.end("<center><h1>404 - Not Found</h1></center>");
}

module.exports = {
  routes,
};
