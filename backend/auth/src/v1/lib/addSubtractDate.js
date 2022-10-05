function gen(add) {
  return (d, count, what) => {
    count = add * count;
    switch (what.toLowerCase()) {
      case 'years':
      case 'year':
      case 'y':
        d.setFullYear(d.getFullYear() + count);
        break;
      case 'months':
      case 'month':
      case 'm':
        d.setMonth(d.getMonth() + count);
        break;
      case 'weeks':
      case 'week':
      case 'w':
        return _(d, count * 7, 'days');
        break;
      case 'days':
      case 'day':
      case 'd':
        d.setDate(d.getDate() + count);
        break;
      case 'hours':
      case 'hour':
      case 'h':
        d.setHours(d.getHours() + count);
        break;
      case 'minutes':
      case 'minute':
      case 'm':
        d.setMinutes(d.getMinutes() + count);
        break;
      case 'seconds':
      case 'second':
      case 's':
        d.setSeconds(d.getSeconds() + count);
        break;
      case 'milliseconds':
      case 'millisecond':
      case 'ms':
        d.setMilliseconds(d.getMilliseconds() + count);
        break;
      default:
        throw new Error('Invalid range: ' + what);
    }
    return d;
  };
}

const addSubtractDate = {
  add: gen(1),
  subtract: gen(-1),
};

export default addSubtractDate;
