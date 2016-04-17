/**
 * I know there's a built-in ng filter, `currency`.
 * Just wanted to implement it manually to show how i write custom filters.
 */
export default function money() {
  return function (price, symbol = '$', prepend = true) {
    const priceFormatted = (price / 100).toFixed(2);

    // Set the symbol in the right location
    if (prepend) {
      return symbol + priceFormatted;
    } else {
      return priceFormatted + symbol;
    }
  };
}
