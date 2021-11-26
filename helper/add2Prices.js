const add2Price = (num1, num2) => {
  let total =
    parseFloat(num1.slice(0, num1.length - 1)) +
    parseFloat(num2.slice(0, num2.length - 1));

  return total;
};

module.exports = add2Price;
