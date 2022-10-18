const colors = require("colors/safe");

class Colors {
  colorGREEN(cmd) {
    return colors.green(cmd);
  }

  colorError(cmd) {
    return colors.red(cmd);
  }

  colorOuput(cmd) {
    return colors.rainbow(cmd);
  }
}

module.exports = {
  Colors,
};
