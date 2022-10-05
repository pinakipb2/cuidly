import jwt from 'jsonwebtoken';

export const JwtTypes = {
  ACCESS_TOKEN: 'ACCESS_TOKEN',
  REFRESH_TOKEN: 'REFRESH_TOKEN',
};

class JwtService {
  // Signs a JWT with given payload type and unique userId
  static sign(payload, type, userId, custom_expiry = null) {
    if (type === JwtTypes.ACCESS_TOKEN) {
      const expiry = custom_expiry === null ? process.env.ACCESS_TOKEN_EXPIRY_DURATION : custom_expiry;
      const secret = process.env.ACCESS_TOKEN_SECRET + userId;
      return jwt.sign(payload, secret, { expiresIn: expiry, issuer: 'cuidly', audience: userId });
    } else {
      const expiry = custom_expiry === null ? process.env.REFRESH_TOKEN_EXPIRY_DURATION : custom_expiry;
      const secret = process.env.REFRESH_TOKEN_SECRET + userId;
      return jwt.sign(payload, secret, { expiresIn: expiry, issuer: 'cuidly', audience: userId });
    }
  }

  // Verifies the validity of the JWT token, takes in the token and secret
  static verify(token, secret = process.env.ACCESS_TOKEN_SECRET) {
    return jwt.verify(token, secret, { issuer: 'cuidly' });
  }

  // Decode a JWT token
  static decode(token) {
    return jwt.decode(token);
  }
}

export default JwtService;
