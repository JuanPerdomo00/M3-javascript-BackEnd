const process = require("process");
const fs = require("fs");
const request = require("request");
const { Colors } = require("./colors");

const colorShell = new Colors();
const { PWD } = process.env;
const { env } = process;

class Commands {
  echo(cmd) {
    let path = ["PATH", "HOME", "SHELL", "USERNAME"];
    path.forEach((p) => {
      if (cmd.slice(1) === p) {
        return console.log(`\n ${env[p]} \n`);
      }
    });
    return console.log(colorShell.colorOuput(cmd));
  }
  date() {
    return process.stdout.write(colorShell.colorOuput(Date()));
  }
  pwd() {
    return colorShell.colorGREEN(
      process.stdout.write(colorShell.colorOuput(PWD))
    );
  }

  listDirectory() {
    return fs.readdir(".",(err, files) => {
      if (err) throw err;
      files.forEach(function (file) {
        if (file.includes(".")) {
          process.stdout.write(
            "\n" + `${colorShell.colorGREEN(" - ")}${file.toString()}` + "\n"
          );
        } else {
          process.stdout.write(
            "\n" + `${colorShell.colorGREEN(" d ")}${file.toString()}/` + "\n"
          );
        }
      });
      process.stdout.write(colorShell.colorGREEN(">_ "));
    });
  }

  curl(url) {
    return request(url, (error, response, body) => {
      console.error("error:", error);
      console.log("statusCode:", response && response.statusCode);
      console.log("body:", body);
    });
  }

  help() {
    let helpers = [
      colorShell.colorGREEN("\npwd - Muestra la ruta actual del directorio"),
      colorShell.colorGREEN(
        "echo - manda los argumento al stdout. Si ejecutaras echo hola, va a salir un hola en la terminal"
      ),
      colorShell.colorGREEN(
        "ls - Lista la carpeta actual, y los cepara - para archivos ( - ) y ( d ) de directorios"
      ),
      colorShell.colorGREEN("date - Muestra la hora local del sistema"),
      colorShell.colorGREEN(
        "curl - Hace una peticion http de una url y trae la cabezera y el status code"
      ),
      colorShell.colorGREEN("help - Muestra la ayuda de comandos"),
    ];

    return helpers.forEach((h) => {
      console.log(h);
    });
  }
  error() {
    return process.stdout.write(colorShell.colorError("Command not found."));
  }
}

module.exports = {
  Commands,
};
