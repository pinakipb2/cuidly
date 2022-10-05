import Joi from 'joi';
import createError from 'http-errors';
import bcrypt from 'bcrypt';
import prisma from 'prisma';
import userDTO from 'dtos/userDTO';
import userTier from 'utils/userTier';
import { JwtTypes } from 'services/JWTservice';
import RedisClient from 'config/init_redis';

const accountTypeController = {
  async upgradeGuest(req, res, next) {
    const guestSchema = Joi.object({
      id: Joi.string().min(10).max(60).lowercase().trim().required(),
      old_username: Joi.string().min(3).max(60).lowercase().trim().required(),
      username: Joi.string().min(3).max(60).lowercase().trim().required(),
      password: Joi.string().min(6).trim().required(),
      type: Joi.string().trim().valid(userTier.FREE, userTier.PREMIUM).required(),
    });
    try {
      const result = await guestSchema.validateAsync(req.body);
      const { id, old_username, username, password, type } = result;
      const exist = await prisma.User.findUnique({
        where: {
          username,
        },
      });
      if (exist !== null) {
        return next(createError.Conflict('This username is already taken'));
      }
      await prisma.User.findUniqueOrThrow({
        where: {
          username: old_username,
        },
      });
      /* Hash the password with 10 salt rounds */
      const hashedPassword = await bcrypt.hash(password, 10);
      /* Update the user in DB */
      const user = await prisma.User.update({
        where: {
          AND: [{ id }, { username: old_username }],
        },
        data: {
          username,
          password: hashedPassword,
          accountType: type,
        },
      });
      const loggedInUser = userDTO(user);
      // User would be logged into dashboard
      // Sign an access and a refresh token with userid as payload
      const access_token = JwtService.sign(loggedInUser, JwtTypes.ACCESS_TOKEN, loggedInUser.id);
      const refresh_token = JwtService.sign(loggedInUser, JwtTypes.REFRESH_TOKEN, loggedInUser.id);
      // Adding refresh token to redis
      await RedisClient.set(loggedInUser.id, refresh_token, { EX: msToS(process.env.REFRESH_TOKEN_EXPIRY_DURATION) });
      // TODO: remove loggedInUser from resp
      // Send the access and refresh token and user data as reponse
      res.json({ loggedInUser, access_token, refresh_token });
    } catch (err) {
      if (err.isJoi === true) {
        return next(createError.UnprocessableEntity(err.message));
      }
      return next(createError.InternalServerError());
    }
  },
  async FreeToPremium(req, res, next) {
    const refreshSchema = Joi.object({
      refresh_token: Joi.string().trim().required(),
    });
    try {
      const result = await refreshSchema.validateAsync(req.body);
      const decodedToken = JwtService.decode(result.refresh_token);
      const user = await prisma.User.update({
        where: {
          id: decodedToken.id,
        },
        data: {
          accountType: userTier.PREMIUM,
        },
      });
      const loggedInUser = userDTO(user);
      // User would be logged into dashboard
      // Sign an access and a refresh token with userid as payload
      const access_token = JwtService.sign(loggedInUser, JwtTypes.ACCESS_TOKEN, loggedInUser.id);
      const refresh_token = JwtService.sign(loggedInUser, JwtTypes.REFRESH_TOKEN, loggedInUser.id);
      // Adding refresh token to redis
      await RedisClient.set(loggedInUser.id, refresh_token, { EX: msToS(process.env.REFRESH_TOKEN_EXPIRY_DURATION) });
      // TODO: remove loggedInUser from resp
      // Send the access and refresh token and user data as reponse
      res.json({ loggedInUser, access_token, refresh_token });
    } catch (err) {
      if (err.isJoi === true) {
        return next(createError.UnprocessableEntity(err.message));
      }
      return next(createError.InternalServerError());
    }
  },
};

export default accountTypeController;
