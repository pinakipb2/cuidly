const divisors = {
  days: 86400000,
  hours: 3600000,
  minutes: 60000,
  seconds: 1000,
};

const round = (value) => {
  return parseFloat(value.toFixed(1));
};

export default class DateDiff {
  date1;
  date2;
  difference;

  constructor(date1, date2) {
    this.date1 = date1;
    this.date2 = date2;
    this.difference = Math.floor(date1.getTime() - date2.getTime());
  }

  days = () => {
    return round(this.difference / divisors.days);
  };

  weeks = () => {
    return round(this.days() / 7);
  };

  hours = () => {
    return round(this.difference / divisors.hours);
  };

  minutes = () => {
    return round(this.difference / divisors.minutes);
  };

  seconds = () => {
    return round(this.difference / divisors.seconds);
  };

  months = () => {
    let ret = (this.date1.getFullYear() - this.date2.getFullYear()) * 12;
    ret += this.date1.getMonth() - this.date2.getMonth();
    const endOfMonth = this.endOfMonth(this.date2).getDate();
    ret += this.date1.getDate() / endOfMonth - this.date2.getDate() / endOfMonth;
    return round(ret);
  };

  years = () => {
    let ret = this.date1.getFullYear() - this.date2.getFullYear();
    ret += (this.dayOfYear(this.date1) - this.dayOfYear(this.date2)) / this.daysInYear(this.date2);
    return round(ret);
  };

  endOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  };

  dayOfYear = (date) => {
    return (date.getTime() - this.beginOfYear(date).getTime()) / divisors.days;
  };

  daysInYear = (date) => {
    return (this.endOfYear(date).getTime() - this.beginOfYear(date).getTime()) / divisors.days;
  };

  beginOfYear = (date) => {
    return new Date(date.getFullYear(), 0, 0);
  };

  endOfYear = (date) => {
    return new Date(date.getFullYear() + 1, 0, 0);
  };
}

Date.diff = (date1, date2) => new DateDiff(date1, date2);
