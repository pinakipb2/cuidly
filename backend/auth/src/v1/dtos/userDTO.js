const userDTO = (user) => {
  class RespUser {
    constructor(user) {
      this.id = user.id;
      this.username = user.username;
      this.accountType = user.accountType;
      // this.createdAt = user.createdAt;
    }
  }
  const loggedInUser = new RespUser(user);
  const payload = {};
  for (const property in loggedInUser) {
    payload[property] = loggedInUser[property];
  }
  return payload;
};

export default userDTO;
