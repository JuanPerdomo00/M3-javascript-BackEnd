function* fizzBuzzGenerator(max = true) {
  // Tu código acá:
  if (typeof max === 'boolean') {
    let i = 1;
    while (max) {
      if (i % 3 === 0 && i % 5 === 0) {
        yield "Fizz Buzz";
      } else if (i % 3 === 0) {
        yield "Fizz";
      } else if (i % 5 === 0) {
        yield "Buzz";
      } else {
        yield i;
      }
      i++;
    }
  } else {
    let i = 1;
    while (i <= max) {
      if (i % 3 === 0 && i % 5 === 0) {
        yield "Fizz Buzz";
      } else if (i % 3 === 0) {
        yield "Fizz";
      } else if (i % 5 === 0) {
        yield "Buzz";
      } else {
        yield i;
      }
      i++;
    }
  }
}

module.exports = fizzBuzzGenerator;
