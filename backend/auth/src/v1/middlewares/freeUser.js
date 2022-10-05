import createError from 'http-errors';
import prisma from 'prisma';
import JwtService from 'services/JWTservice';
import userTier from 'utils/userTier';

/* Checks if the current user is correctly logged in.
  In other words, it validated the authenticity of the bearer token
*/
const freeUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(createError.Unauthorized());
  }
  /* 0th index is "Bearer" and 1st index is the " JWT Token" */
  const token = authHeader.split(' ')[1];
  try {
    const decodedToken = JwtService.decode(token);
    if (decodedToken.iss !== 'cuidly') {
      return next(createError.Unauthorized('Invalid Access Token'));
    }
    if (decodedToken.accountType !== userTier.FREE) {
      return next(createError.Unauthorized('Not FREE tier User'));
    }
    const userId = decodedToken.id;
    // Checks the validity of the "Token"
    JwtService.verify(token, process.env.ACCESS_TOKEN_SECRET + userId);
    // const user = { id };
    // /* Sets the (request variable) -> "user" as the current user
    //    For upcoming requests to reference
    // */
    // req.user = user;
    await prisma.User.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });
    next();
  } catch (err) {
    return next(createError.Unauthorized());
  }
};

export default freeUser;
