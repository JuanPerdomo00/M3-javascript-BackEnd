const express = require("express");
const app = express();

app.use(express.json()); // for parsing application/json

app.get("/", (req, res) => {
  res.json({
    message: "hola",
  });
});

app.get("/test", (req, res) => {
  res.json({
    message: "test",
  });
});

app.post("/product", (req, res) => {
  res.json({
    result: req.body.a / req.body.b,
  });
});

app.post("/sum", (req, res) => {
  const { a, b } = req.body;
  let sum = Number(a + b);

  if (sum !== NaN) {
    res.sendStatus(200);
    // console.log(typeof sum)
    res.json({
      result: sum,
    });
  }
});

module.exports = app; // Exportamos app para que supertest session la pueda ejecutar
