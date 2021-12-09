const convertPrice = (price) => {
  let number = parseFloat(price.slice(0, price.length - 1));

  return number;
};

module.exports = convertPrice;
