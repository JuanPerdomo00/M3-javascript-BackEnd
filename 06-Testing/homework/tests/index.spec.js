const session = require("supertest-session");
const app = require("../index.js"); // Importo el archivo de entrada del server de express.
const { sumArray, pluck } = require("../utils");

const agent = session(app);

describe("Test de APIS", () => {
  describe("GET /", () => {
    it("responds with 200", () => agent.get("/").expect(200));
    it("responds with and object with message `hola`", () =>
      agent.get("/").then((res) => {
        expect(res.body.message).toEqual("hola");
      }));
  });

  describe("GET /test", () => {
    it("responds with 200", () => agent.get("/test").expect(200));
    it("responds with and object with message `test`", () =>
      agent.get("/test").then((res) => {
        expect(res.body.message).toEqual("test");
      }));
  });

  describe("POST /sum", () => {
    it("responds with 200", () => agent.post("/sum").expect(200));
    it("responds with the sum of 2 and 3", () =>
      agent
        .post("/sum")
        .send({ a: 2, b: 3 })
        .then((res) => {
          expect(res.body.result).toEqual(5);
        }));

    it("responds with the sum of 3 and 3", () =>
      agent
        .post("/sum")
        .send({ a: 3, b: 3 })
        .then((res) => {
          expect(res.body.result).toEqual(6);
        }));
  });

  describe("POST /product", () => {
    it("responds with 200", () => agent.post("/product").expect(200));
    it("responds with the product of 2 and 3", () =>
      agent
        .post("/product")
        .send({ a: 2, b: 3 })
        .then((res) => {
          expect(res.body.result).toEqual(6);
        }));
  });

  describe("POST /sumArray", () => {
    // it("responds with 200", () => agent.post("/sumArray").expect(200));
    it("responds with and object with true", () =>
      agent
        .post("/sumArray")
        .send({ array: [2, 5, 7, 10, 11, 15, 20], num: 13 })
        .then((res) => {
          expect(res.body.result).toEqual(true);
        }));
  });

  describe("UTILS SUMARR", () => {
    it("responder true su la suma del arr es igual al numero pasado", () => {
      expect(sumArray([2, 5, 7, 10, 11, 15, 20], 13)).toBe(true);
    });

    it("responder false su la suma del arr no es al numero pasado", () => {
      expect(sumArray([2, 5, 7, 10, 11, 15, 20], 666)).toBe(false);
    });
  });

  describe("GET /numString", () => {
    it("responds with 404 si no se le envian parametros", () =>
      agent.get("/numString").expect(404));
    it("responds with 404 si le pasan un numero", () =>
      agent.get("/numString?q=2").expect(404));
    it("responds with 200", () => agent.get("/numString?q=jake").expect(200));

    it("Si enviamos hola debe retornar 4, ya que hola tiene 4 caracteres", () => {
      agent.get("/numString?q=hola").then((res) => {
        expect(res.body.result).toEqual(4);
      });
    });

    it("Si enviamos mundo debe retornar 5, ya que mundo tiene 5 caracteres", () => {
      agent.get("/numString?q=mundo").then((res) => {
        expect(res.body.result).toEqual(5);
      });
    });
  });

  describe("POST /pluck", () => {
    const arr = [
      { name: "tv", price: 3000 },
      { name: "lego", price: 200 },
    ];
    it("respont with 200", () => {
      agent.post("/pluck").expect(200);
    });
    it("responder 400 si no hay paremetros", () => {
      agent.post("/pluck").expect(400);
    })
    it("responder 400 si el string prop esta vacio", () => {
      agent.post("/pluck").send({ arr, prop: "" }).expect(400);
    })
    it("responder los value con la prop padada", () => {
      agent
        .post("/pluck")
        .send({ arr, prop: "name" })
        .then((res) => {
          expect(res.body.result).toEqual(["tv", "lego"]);
        });
    });
  });

  describe("UTILS pluck", () => {
    const arr = [
      { name: "tv", price: 3000 },
      { name: "lego", price: 200 },
    ];
    const arrTwo = [
      { name: "tv", price: 3000 },
      { name: "lego", price: 200 },
    ];
    it("responder los values de name", () => {
      expect(pluck(arr, "name")).toEqual(["tv", "lego"]);
    });
    it("responder los values de name", () => {
      expect(pluck(arrTwo, "price")).toEqual([3000, 200]);
    });
  });
});
