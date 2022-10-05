import ms from 'ms';

const msToS = (timeInMs) => {
  return ms(timeInMs) / 1000;
};

export default msToS;
