// const { argv } = require("node:process");
const { Colors } = require("./commands/colors");
const { env } = require("process");

let colorShell = new Colors();

// argv.forEach((val, index) => {
//   console.log(`${index}: ${val}`);
// });

// console.log(argv);

let path = ["$HOME", "$SHELL"];
function echo(cmd) {
  path.forEach((p) => {
    if (cmd === p) {
      p = p.slice(1);
      console.log(env[p]);
    }
  });
  console.log(cmd);
}

echo("$HOME");
