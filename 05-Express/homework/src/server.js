const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;
let ID = 1;
// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());
// server.use(bodyParser.json())

// TODO: your code to handle requests

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

server.get("/posts/:author/:title", (req, res) => {
  const { author, title } = req.params;

  const filtrados = posts.filter(
    (post) => post.author === author && post.title === title
  );

  if (filtrados.length === 0) {
    return res.status(STATUS_USER_ERROR).json({
      error: "No existe ningun post con dicho titulo y autor indicado",
    });
  }
  res.json(filtrados);
});

//! http://127.0.0.2:8080/posts?term=hola ----> req.query ----> {term: "hola"}
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
    id: ID,
    author,
    title,
    contents,
  };
  posts.push(obj);
  ID += 1;
  res.json(obj);
});

server.post("/posts/author/:author", (req, res) => {
  let obj;
  let { author } = req.params;
  let { title, contents } = req.body;
  if (!author || !title || !contents) {
    res.status(STATUS_USER_ERROR).json({
      error: "No se recibieron los parámetros necesarios para crear el Post",
    });
  }

  obj = {
    id: ID,
    author,
    title,
    contents,
  };
  posts.push(obj);
  ID += 1;
  res.json(obj);
});

server.put("/posts", (req, res) => {
  const { id, title, contents } = req.body;

  if (!id || !title || !contents) {
    return res.status(STATUS_USER_ERROR).json({
      error:
        "No se recibieron los parámetros necesarios para modificar el Post",
    });
  }

  const post = posts.find((post) => post.id === id);
  console.log(post);
  if (!post) {
    return res.status(STATUS_USER_ERROR).json({
      error: "EL id no corresponde",
    });
  }

  post.title = title;
  post.contents = contents;

  res.json(post);
});

server.delete("/posts", (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(STATUS_USER_ERROR).json({ error: "el id jsjsjs" });
  }
  const post = posts.find((post) => post.id !== id);

  if (!post) {
    return res.status(STATUS_USER_ERROR).json({ error: "largo mi ciela" });
  }

  res.json({ success: true });
});

server.delete("/author", (req, res) => {
  const { author } = req.body;
  if (!author) {
    return res.status(STATUS_USER_ERROR).json({ error: "el id jsjsjs" });
  }
  const postA = posts.filter((post) => post.author === author);

  if (!postA.length) {
    return res.status(STATUS_USER_ERROR).json({"error": "No existe el autor indicado"});
  }

  posts = posts.filter((post) => post.author !== author);

  res.json(postA);
});

module.exports = { posts, server };
