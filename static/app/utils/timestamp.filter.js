export default function timestamp() {
  return function (date) {
    // Map of durations in seconds
    const epochs = {
      day: 86400,
      hour: 3600,
      minute: 60
    };

    const getDuration = (seconds) => {
      for (let epoch of Object.keys(epochs)) {
        let interval = Math.floor(seconds / epochs[epoch]);
        if (interval >= 1) {
          return {
            interval: interval,
            epoch: epoch
          };
        }
      }
    };

    const fromNow = (date) => {
      let seconds = Math.floor((new Date() - new Date(date)) / 1000);
      let { interval, epoch } = getDuration(seconds);
      let suffix = interval === 1 ? '' : 's';

      if (interval > 7 && epoch === 'day') {
        return date;
      }
      return `${interval} ${epoch}${suffix} ago`;
    };

    return fromNow(date);
  };
}
