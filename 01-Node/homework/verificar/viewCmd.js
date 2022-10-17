const { Commands } = require("../commands/index");

const comando = new Commands();

function main(cmd, arg = "") {
  switch (typeof cmd === "string") {
    case cmd === `echo ${arg}`:
      comando.echo(arg);
      break;
    case cmd === "date":
      comando.date();
      break;
    case cmd === "pwd":
      comando.pwd();
      break;
    case cmd === "ls":
      comando.listDirectory();
      break;
    case cmd === "help":
      comando.help();
      break;
    case cmd === `curl ${arg}`:
      comando.curl(arg);
      break;
    default:
      comando.error();
  }
}

module.exports = {
  main,
};
