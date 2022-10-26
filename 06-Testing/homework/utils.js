function sumArray(arr, num) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === num) {
        return true;
      }
    }
  }
  return false;
}

function pluck(arr, prop) {
  return arr.map((el) => el[prop]);
}

module.exports = {
  sumArray,
  pluck,
};
