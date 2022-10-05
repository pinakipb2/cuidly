import Joi from 'joi';
import createError from 'http-errors';
import RedisClient from 'config/init_redis';
import prisma from 'prisma';
import userDTO from 'dtos/userDTO';
import JwtService, { JwtTypes } from 'services/JWTservice';
import msToS from 'lib/msToS';

// This route acts as a rotating refresh token route
// This route can be used to get a new refresh and access token,
// if access token is expired and refresh token is not.
const refreshController = {
  /* Controller for user to refresh the access and refresh token */
  async refresh(req, res, next) {
    const refreshSchema = Joi.object({
      refresh_token: Joi.string().trim().required(),
    });
    try {
      // Validating the incoming request schema
      const result = await refreshSchema.validateAsync(req.body);
      if (!result.refresh_token) {
        return next(createError.Unauthorized('Invalid Refresh Token'));
      }
      const decodedToken = JwtService.decode(result.refresh_token);
      if (decodedToken.iss !== 'cuidly') {
        return next(createError.Unauthorized('Invalid Refresh Token'));
      }
      const userId = decodedToken.id;
      try {
        /* Verifying the validity of the refresh token and checking if the token exists in Redis */
        JwtService.verify(result.refresh_token, process.env.REFRESH_TOKEN_SECRET + userId);
        const token = await RedisClient.get(userId);
        if (!token || token != result.refresh_token) {
          return next(createError.Unauthorized('Invalid Refresh Token'));
        }
      } catch (err) {
        return next(createError.Unauthorized('Invalid Refresh Token'));
      }
      /* Checking if the user exists in the DB */
      const user = await prisma.User.findUnique({
        where: {
          id: userId,
        },
      });
      if (!user) {
        return next(createError.Unauthorized('No User Found'));
      }
      const loggedInUser = userDTO(user);
      // Sign an access and a refresh token with userid as payload
      const access_token = JwtService.sign(loggedInUser, JwtTypes.ACCESS_TOKEN, loggedInUser.id);
      const refresh_token = JwtService.sign(loggedInUser, JwtTypes.REFRESH_TOKEN, loggedInUser.id);
      // Adding refresh token to redis
      await RedisClient.set(loggedInUser.id, refresh_token, { EX: msToS(process.env.REFRESH_TOKEN_EXPIRY_DURATION) });
      // Send the new access and refresh token as reponse
      res.json({ loggedInUser, access_token, refresh_token });
    } catch (err) {
      if (err.isJoi === true) {
        return next(createError.UnprocessableEntity(err.message));
      }
      return next(createError.InternalServerError());
    }
  },
};

export default refreshController;
