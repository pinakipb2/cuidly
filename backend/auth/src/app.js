import express from 'express';
import 'config/env.config';
import cors from 'cors';
import createError from 'http-errors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import xss from 'xss-clean';
import morgan from 'morgan';
import favicon from 'serve-favicon';
import path from 'path';

import RedisClient from 'config/init_redis';
import prisma from 'prisma';
import route from 'routes';

// RateLimitter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    status: 429,
    message: 'Too Many Requests',
  },
});

const corsOption = {
  // TODO: remove localhost
  origin: [process.env.FRONTEND_URL, 'http://localhost:3000'],
};

const app = express();

// Middlewares
app.use(helmet());
app.set('trust proxy', 1);
app.use(limiter);
app.use(xss());
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Connecting to Redis
(async () => {
  await RedisClient.connect();
})();

// Welcome Route
app.all('/', async (req, res, next) => {
  res.send({ message: 'Hello from Auth Service 🔐' });
});

const preLoad = '/backend/auth';
const apiVersion = 'v1';

// Home Route
app.all(`${preLoad}/${apiVersion}`, async (req, res, next) => {
  res.send({ message: `Hello from Auth Service ${apiVersion} 🔐` });
});

// Auth Routes
app.use(`${preLoad}/${apiVersion}`, route);

// 404 Handler
app.use((req, res, next) => {
  next(createError.NotFound());
});

// Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

// Server Configs
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  try {
    const defaults = {
      guestUserLinks: 10,
      guestUserTTL: 10,
      freeUserLinks: 100,
      freeUsersRateLimit: 100,
    };
    const value = await JSON.stringify(defaults);
    const isSet = await RedisClient.SETNX('defaults', value);
    const isGuestSet = await RedisClient.SETNX('guestNumber', '0');
    if (isSet) {
      console.log('Defaults are Initialized in Redis! ✅');
    }
    if (isGuestSet) {
      console.log('GuestNumber is Initialized in Redis! ✅');
    }
    if (!isSet && !isGuestSet) {
      console.log('All values Initialized in Redis! 🥳😎😁');
    }
    const dbresp = await prisma.$queryRaw`SELECT 1`;
    if (dbresp[0]['?column?'] === 1) {
      console.log('DB UP and Running! 🚀👍');
    }
  } catch (err) {
    console.log(err.message);
  }
  console.log(`🚀 @ http://localhost:${PORT}`);
});
