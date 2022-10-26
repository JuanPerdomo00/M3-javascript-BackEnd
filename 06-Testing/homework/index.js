const express = require("express");
const app = express();
const { sumArray, pluck } = require("./utils");

app.use(express.json()); // for parsing application/json

app.get("/", (req, res) => {
  res.json({
    message: "hola",
  });
});

app.get("/numString", (req, res) => {
  const { q } = req.query;
  if (!q || !isNaN(Number(q))) {
    return res.sendStatus(404);
  }
  res.json({
    result: q.length,
  });
});

app.get("/test", (req, res) => {
  res.json({
    message: "test",
  });
});

app.post("/product", (req, res) => {
  const { a, b } = req.body;
  res.json({
    result: a * b,
  });
});

app.post("/sum", (req, res) => {
  const { a, b } = req.body;
  let sum = Number(a + b);

  if (sum !== NaN) {
    // console.log(typeof sum)
    res.json({
      result: sum,
    });
  }
});

app.post("/sumArray", (req, res) => {
  const { array, num } = req.body;
  // console.log(array, num);

  // let suma = array.reduce((a, b) => a + b);
  // res.sendStatus();
  const result = sumArray(array, num);
  res.json({
    result,
  });
  res.sendStatus(200);
});

app.post("/pluck", (req, res) => {
  const { arr, prop } = req.body;
  if (!arr || !prop) {
    return res.sendStatus(400);
  }
  const result = pluck(arr, prop);

  res.json({
    result,
  });
});

module.exports = app; // Exportamos app para que supertest session la pueda ejecutar
