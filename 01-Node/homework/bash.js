const { main } = require("./verificar/viewCmd");
const { Colors } = require("./commands/colors");
const colors = new Colors();





console.log(colors.colorGREEN("Use Ctrl-c from exit"));
process.stdout.write(colors.colorGREEN("\n>_ "));

// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on("data", (data) => {
  let cmd = data.toString().trim();
  let arg;
  if (cmd.includes("echo")) {
    arg = cmd.split(",")[0].slice(5).trim();
  } else if (cmd.includes("curl")) {
    arg = cmd.split(",")[0].slice(4).trim()
    console.log(arg)
  }



  // console.log(typeof cmd);
  process.stdout.write("\n");
  process.stdout.write(colors.colorGREEN("\n>_ "));
  main(cmd, arg);
  process.stdout.write(colors.colorGREEN("\n>_ "));
});
