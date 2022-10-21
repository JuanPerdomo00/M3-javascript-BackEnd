"use strict";
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:
function $Promise(executor) {
  if (typeof executor !== "function") {
    throw new TypeError("executor not a function");
  }
  this._state = "pending";
  this._value = undefined;
  executor(
    (resolve) => {
      this._internalResolve(resolve);
    },
    (reject) => this._internalReject(reject)
  );
}

$Promise.prototype._internalResolve = function (data) {
  // this.keysArgsName = Object.keys(data);
  // this.valuesArgs = Object.values(data);
  // this._value = data
  // this.__cache = [];

  // this._value = data[keysArgsName[0]];

  // if(this.__cache.length === 0) {
  //   this.__cache.push(this._value)
  //   this._state = "pending"
  //   return
  // }
  if (this._state === "pending") {
    this._state = "fulfilled";
    this._value = data;
  }
};

$Promise.prototype._internalReject = function (data) {
  if (this._state === "pending") {
    this._state = "rejected";
    this._value = data;
  }
};

// const prub = new $Promise(() => {});

module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
