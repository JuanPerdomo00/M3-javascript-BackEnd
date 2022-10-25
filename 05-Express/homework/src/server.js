const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());
// server.use(bodyParser.json())

// TODO: your code to handle requests



server.get("/posts/:author/:title", (req, res) => {

})



server.get("/posts/:author", (req, res) => {
  let { author } = req.params;

  const autor = posts.filter((post) =>
    post.title && post.contents ? post.author === author : null
  );
  if (autor.length === 0) {
    res
      .status(STATUS_USER_ERROR)
      .json({ error: "No existe ningun post del autor indicado" });
  }
  return res.json(autor);
});

server.get("/posts", (req, res) => {
  // let { term } = req.params;
  // let { url } = req;
  // let { title, contents } = req.query;
  // let urlArr = url.split("/");

  // if (urlArr[2] === term) {
  //   res.json({
  //     title: term[title],
  //     contents: term[contents],
  //   });
  //}

  // res.json(posts.forEach((post) => post));

  let { term } = req.query;

  //? term -> titulo || term -> contents
  //! first title
  const termin = posts.filter(
    (post) => post.title.includes(term) || post.contents.includes(term)
  );
  if (termin) {
    res.json(termin);
  }
  res.json(posts);
});

server.post("/posts", (req, res) => {
  let { author, title, contents } = req.body;
  let obj;
  if (!author || !title || !contents) {
    res.status(STATUS_USER_ERROR).json({
      error: "No se recibieron los parámetros necesarios para crear el Post",
    });
  }
  obj = {
    id: 1,
    author,
    title,
    contents,
  };
  posts.push(obj);
  res.json(obj);
});

server.post("/posts/author/:author", (req, res) => {
  let { author } = req.params;
  let { title, contents } = req.body;
  if (!author || !title || !contents) {
    res.status(STATUS_USER_ERROR).json({
      error: "No se recibieron los parámetros necesarios para crear el Post",
    });
  }

  obj = {
    id: 1,
    author,
    title,
    contents,
  };
  posts.push(obj);
  res.json(obj);
});

module.exports = { posts, server };
