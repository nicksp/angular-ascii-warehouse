export default function Utils($timeout) {

  /**
   * Create an array with unique values by shuffling a list of numbers.
   */
  this.getRandomArray = (size) => {
    let arr = [], i = 0;

    for ( ; i < size; i++) {
      arr[i] = i;
    }

    function shuffle(array) {
      let tmp, current, len = array.length;

      if (len) {
        while (--len) {
          current = Math.floor(Math.random() * (len + 1));
          tmp = array[current];
          array[current] = array[len];
          array[len] = tmp;
        }
      }

      return array;
    }

    return shuffle(arr);
  };

  /**
   * Get a random integer between min (included) and max (included).
   */
  this.getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  /**
   * For parsing newline delimited JSON (Streaming JSON).
   */
  this.parseStreamingJSON = (stream) => {
    let data = stream.split('\n');

    // If the last element is empty, remove it
    if (!data[data.length - 1]) {
      data.pop();
    }

    return data.map((item) => {
      return JSON.parse(item);
    });
  };

  /**
   * Throttle the amount of times function `fn` runs.
   */
  this.throttle = (fn, delay) => {
    let timer = null;
    return function () {
      let context = this,
          args = arguments;

      $timeout.cancel(timer);
      timer = $timeout(() => {
        fn.apply(context, args);
      }, delay);
    };
  };
}
