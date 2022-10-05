import createError from 'http-errors';
import RedisClient from 'config/init_redis';
import prisma from 'prisma';
import userDTO from 'dtos/userDTO';
import userTier from 'utils/userTier';
import JwtService, { JwtTypes } from 'services/JWTservice';
import requestIp from 'request-ip';
import msToS from 'lib/msToS';

const zeroPad = (num, places = 9) => String(num).padStart(places, '0');
const guestController = {
  async requestGuest(req, res, next) {
    try {
      // TODO: install https://www.npmjs.com/package/geoip-country <- TO TRACK COUNTY FROM IP
      // TODO: geolocation can be null
      const userIP = requestIp.getClientIp(req);
      // If the user has not exposed his IP then this service is not for user
      if (userIP === null) {
        return next(createError.ExpectationFailed('Try to login for Free Tier'));
      }
      const guestNumfromRedis = await RedisClient.get('guestNumber');
      const guestNum = parseInt(guestNumfromRedis, 10);
      const guest = 'G-' + zeroPad(guestNum);
      const exist = await prisma.User.findUnique({
        where: {
          username: guest,
        },
      });
      if (exist !== null) {
        return next(createError.Conflict('This username is already taken'));
      }
      const userWithIP = await prisma.User.findFirst({
        where: {
          AND: [
            {
              IP: userIP,
            },
            {
              accountType: userTier.GUEST,
            },
          ],
        },
      });
      // If guest user does not exist in DB
      if (userWithIP === null) {
        await prisma.$transaction(async (tx) => {
          const user = await tx.User.create({
            data: {
              username: guest,
              IP: userIP,
            },
          });
          const loggedInUser = userDTO(user);
          // Sign an access and a refresh token with user as payload
          const access_token = JwtService.sign(loggedInUser, JwtTypes.ACCESS_TOKEN, loggedInUser.id);
          const defaults = JSON.parse(await RedisClient.get('defaults'));
          const guestSessionTTL = `${defaults.guestUserTTL}d`;
          const refresh_token = JwtService.sign(loggedInUser, JwtTypes.REFRESH_TOKEN, loggedInUser.id, guestSessionTTL);
          // Adding refresh token to redis
          await RedisClient.set(loggedInUser.id, refresh_token, { EX: msToS(guestSessionTTL) });
          await RedisClient.set('guestNumber', (guestNum + 1).toString());
          // Send the access and refresh token and user data as reponse
          // TODO: remove loggedInUser from resp
          // as jwt tokens has been encoded with the values
          res.json({ loggedInUser, access_token, refresh_token });
        });
      } else {
        const loggedInUser = userDTO(userWithIP);
        const token = await RedisClient.get(loggedInUser.id);
        // If the token is not present that means the duration of account has been expired
        if (!token) {
          // Token is not deleted, and cron has not successfully yet, delete manually from DB
          // FIXME: any need of cron job in auth ? -> "yes" for oprhan records
          // TODO: also send request to urlshortner to delete all urls associated with this userid
          await prisma.User.deleteMany({
            where: {
              AND: [
                {
                  IP: userIP,
                },
                {
                  accountType: userTier.GUEST,
                },
              ],
            },
          });
          // TODO: If axios inceptor sees this message, then it will again send a request to this route to create a new guest account
          return next(createError.Unauthorized('Guest Account has Expired'));
        }
        // Sign an access and a refresh token with user as payload
        const access_token = JwtService.sign(loggedInUser, JwtTypes.ACCESS_TOKEN, loggedInUser.id);
        const refresh_token = token;
        // Send the access and refresh token and user data as reponse
        // TODO: remove loggedInUser from resp
        // as jwt tokens has been encoded with the values
        res.json({ loggedInUser, access_token, refresh_token });
      }
    } catch (err) {
      console.log(err);
      return next(createError.InternalServerError());
    }
  },
};

export default guestController;
