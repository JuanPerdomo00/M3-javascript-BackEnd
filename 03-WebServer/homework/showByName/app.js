let http = require("http");
let { verificPath } = require("./conditionals");
const PORT = 9100;

// Escribí acá tu servidor
const server = http.createServer((req, res) => {
  let { url } = req;

  verificPath(url, req, res);
});
server.listen(PORT, "127.0.0.1");
console.log(`Servidor escuchando en: http://127.0.0.1:${PORT}`);
