// ------------------------------> Repaso by jakepys <----------------------------------------

// const pA = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     // resolve("se resolvio A");
//     reject("se rechazo A");
//   }, 1000);
// });

// console.log("1", pA);

// pA.then(
//   (data) => {
//     console.log("2: ", data);
//   },
//   (err) => {
//     console.log("3", err);
//   }
// );

// ------------------------------------------------> FLOWCHART <--------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------

const pA = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve("Se resolvio A");
    // reject("Se rechazo A");
  }, 1000);
});

//-----------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------

/* 

cuando no se le pasa nungun handler, este va retornar una copia de la promesa
a la cual este haciendo el then sin handlers
*/
// const pB = pA.then();

// console.log("1", pB); //pending

// pB.then((data) => {
//   console.log("2", data);
// });

//-----------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------

/** 
como vimos en el caso anterior al no pasarle un succesHandler, el then resolveria retornando una copia de la promesa la cual
fue llamado, fijemonos en los then que estan apilados, estos iran pasandose la promesa hasta que uno de ellos le pasen
el succesHandler. Como el siguiente ejemplo
*/

// pA.then() // resolve(se resolvio A)
//   .then() // resolve(se resolvio A)
//   .then() // resolve(se resolvio A)
//   .then((data) => {
//     console.log("wtf???", data); // se resolvio A
//   })
/**
    caso contrario si la promesa fuera reject, esta estaria retornando el reject que hayamos pasado a la funcion reject,
    hata no encontrar un errorHandler esta no se mostrara y si no encontrara un error handlers en la consola mostraria
    un error.
   */
// .then(null, (err) => {
//   console.log(err, "por fin te encontre");
// });

// pA.then((data) => {
//   console.log("1", data);
//   return "me voy como resolve de promesa para el siguiente then :D";
// })
//   .then((data) => {
//     console.log("2", data);
//   })

//   .then(null, (err) => {
//     console.log("3", err);
//     return "me voy como reject de promesa para el siguiente then :D error"
//   })
//   .then(data => {
//     console.log("4", data);
//   })

//-----------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------

// pA.then((data) => {
//   console.log("1", data);
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       // resolve("SE RESOLVIO TODO BONITO :)");
//       reject("ME RECHAZO :(");
//     }, 1000);
//   });
// })
//   .then((data) => {
//     console.log("2", data);
//     return data.toLowerCase();
//   })
//   .then((data) => {
//     console.log("3", data);
//   })
//   .then(null, (err) => {
//     console.log("3", err);
//   });

// ------------------------------- SI ARROJA UN ERROR -------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------

pA.then((data) => {
  console.log("1", data);
  throw new TypeError("EMMM CHAU!!!");
})
  .then((data) => {
    console.log("2", data);
  })
  .then(null, (err) => {
    console.log("3", err);
  });
