const http = require("http");
const { routes } = require("./routes");
const PORT = 9090;

const server = http.createServer((req, res) => {
  let { url, method } = req;

  routes(req, res, url, method);
});

server.listen(PORT, "127.0.0.1");
console.log(`server listener in http:127.0.0.1:${PORT}`);
