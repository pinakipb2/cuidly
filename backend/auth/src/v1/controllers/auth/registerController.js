import Joi from 'joi';
import createError from 'http-errors';
import bcrypt from 'bcrypt';
import prisma from 'prisma';
import userDTO from 'dtos/userDTO';
import requestIp from 'request-ip';
import userTier from 'utils/userTier';

const registerController = {
  async register(req, res, next) {
    const registerSchema = Joi.object({
      username: Joi.string().min(3).max(60).lowercase().trim().required(),
      password: Joi.string().min(6).trim().required(),
      type: Joi.string().trim().valid(userTier.FREE, userTier.PREMIUM).required(),
    });
    try {
      const result = await registerSchema.validateAsync(req.body);
      const { username, password, type } = result;
      const exist = await prisma.User.findUnique({
        where: {
          username,
        },
      });
      const userIP = requestIp.getClientIp(req);
      if (exist !== null) {
        return next(createError.Conflict('This username is already taken'));
      }
      /* Hash the password with 10 salt rounds */
      const hashedPassword = await bcrypt.hash(password, 10);
      /* Store the user in DB */
      const user = await prisma.User.create({
        data: {
          username,
          password: hashedPassword,
          accountType: type,
          IP: userIP,
        },
      });
      const savedUser = userDTO(user);
      /* Return the stored user details as success response */
      res.status(201).send(savedUser);
    } catch (err) {
      console.log(err);
      if (err.isJoi === true) {
        return next(createError.UnprocessableEntity(err.message));
      }
      return next(createError.InternalServerError());
    }
  },
};

export default registerController;
