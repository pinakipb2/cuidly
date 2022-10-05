import express from 'express';
import 'config/env.config';
import cors from 'cors';
import createError from 'http-errors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import xss from 'xss-clean';
import morgan from 'morgan';
import os from 'os';
import favicon from 'serve-favicon';
import path from 'path';

import RedisClient from 'config/init_redis';
import prisma from 'prisma';

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
  origin: [process.env.FRONTEND_URL],
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
  res.send({ message: 'Hello from URLShortner 😎', host: os.hostname() });
});

// Home Route
app.all('/backend/urlshortner', async (req, res, next) => {
  res.send({ message: 'Hello from URLShortner 😎', host: os.hostname() });
});

const preLoad = '/backend/urlshortner';
const apiVersion = 'v1';

// Product Route
// app.use(`/api/${apiVersion}/product`, productRoutes);
// app.use(`/api/${apiVersion}/retailer`, retailerRoutes);
// app.use(`/api/${apiVersion}/ecommerce`, ecommerceRoutes);

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
const PORT = process.env.PORT || 5001;
app.listen(PORT, async () => {
  try {
    const dbresp = await prisma.$queryRaw`SELECT 1`;
    if (dbresp[0]['?column?'] === 1) {
      console.log('DB UP and Running! 🚀👍');
    }
  } catch (err) {
    console.log(err.message);
  }
  console.log(`🚀 @ http://localhost:${PORT}`);
});
