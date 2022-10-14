const wishMessage = () => {
  const day = new Date();
  const hr = day.getHours();
  if (hr >= 0 && hr < 12) {
    return 'Good Morning';
  } else if (hr == 12) {
    return 'Good Noon';
  } else if (hr >= 12 && hr <= 17) {
    return 'Good Afternoon';
  }
  return 'Good Evening';
};

export { wishMessage };
