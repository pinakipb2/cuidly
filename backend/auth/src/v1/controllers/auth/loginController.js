import Joi from 'joi';
import createError from 'http-errors';
import bcrypt from 'bcrypt';
import RedisClient from 'config/init_redis';
import prisma from 'prisma';
import userDTO from 'dtos/userDTO';
import JwtService, { JwtTypes } from 'services/JWTservice';
import msToS from 'lib/msToS';

const loginController = {
  async login(req, res, next) {
    const loginSchema = Joi.object({
      username: Joi.string().min(3).max(60).lowercase().trim().required(),
      password: Joi.string().min(6).trim().required(),
    });
    try {
      const result = await loginSchema.validateAsync(req.body);
      const { username, password } = result;
      const user = await prisma.User.findUnique({
        where: {
          username,
        },
      });
      // If user not found in DB thorw Unauthorized error
      if (!user) {
        return next(createError.Unauthorized('Check Credentials'));
      }
      // If the passwords do not match throw Unauthorized error
      const matchPassword = await bcrypt.compare(password, user.password);
      if (!matchPassword) {
        return next(createError.Unauthorized('Check Credentials'));
      }
      // // Check if the user is already logged in by checking into the Redis client
      // const token = await RedisClient.get(user.id);
      // // If the user is already logged in, throw error that the user is already logged in
      // if (token) {
      //   return next(createError.Unauthorized('User is already logged in'));
      // }
      const loggedInUser = userDTO(user);
      // Sign an access and a refresh token with userid as payload
      const access_token = JwtService.sign(loggedInUser, JwtTypes.ACCESS_TOKEN, loggedInUser.id);
      const refresh_token = JwtService.sign(loggedInUser, JwtTypes.REFRESH_TOKEN, loggedInUser.id);
      // Adding refresh token to redis
      await RedisClient.set(loggedInUser.id, refresh_token, { EX: msToS(process.env.REFRESH_TOKEN_EXPIRY_DURATION) });
      // TODO: remove loggedInUser from resp
      // Send the access and refresh token and user data as reponse
      res.json({ loggedInUser, access_token, refresh_token });
    } catch (err) {
      console.log(err.message);
      if (err.isJoi === true) {
        return next(createError.UnprocessableEntity(err.message));
      }
      return next(createError.InternalServerError());
    }
  },
  async logout(req, res, next) {
    const refreshSchema = Joi.object({
      refresh_token: Joi.string().trim().required(),
    });
    try {
      const result = await refreshSchema.validateAsync(req.body);
      if (!result.refresh_token) {
        return next(createError.Unauthorized('Invalid Refresh Token'));
      }
      const decodedToken = JwtService.decode(result.refresh_token);
      const userId = decodedToken.id;
      try {
        /* Here the incoming refresh token would be validated */
        JwtService.verify(result.refresh_token, process.env.REFRESH_TOKEN_SECRET + userId);
        /* Here the token would be retrived from the Redis client */
        const token = await RedisClient.get(userId);
        /* If the token is not present in the Redis client
           OR
           the incoming refresh token does not matches the token from the Redis client
           then throw an Unauthorized error
        */
        if (!token || token !== result.refresh_token) {
          return next(createError.Unauthorized('Invalid Refresh Token'));
        }
      } catch (err) {
        return next(createError.Unauthorized('Invalid Refresh Token'));
      }
      /* Search for the user in the DB */
      const user = await prisma.User.findUnique({
        where: {
          id: userId,
        },
      });
      /* If user is not found throw Unauthorized error */
      if (!user) {
        return next(createError.Unauthorized('No User Found'));
      }
      /* Delete the refresh token from the Redis client */
      try {
        await RedisClient.del(user.id);
      } catch (err) {
        return next(createError.InternalServerError());
      }
      /* Send an respose that logout operation on that user has been performed successfully */
      res.json({ status: '200', message: 'Logged Out Successfully' });
    } catch (err) {
      console.log(err.message);
      if (err.isJoi === true) {
        return next(createError.UnprocessableEntity(err.message));
      }
      return next(createError.InternalServerError());
    }
  },
};

export default loginController;
