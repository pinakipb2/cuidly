import express from 'express';

import accountTypeController from 'controllers/accountTypeController';
import guestController from 'controllers/auth/guestController';
import loginController from 'controllers/auth/loginController';
import refreshController from 'controllers/auth/refreshController';
import registerController from 'controllers/auth/registerController';
import auth from 'middlewares/auth';
import freeUser from 'middlewares/freeUser';

const router = express.Router();

router.post('/request-guest', guestController.requestGuest);

router.post('/register', registerController.register);

router.post('/login', loginController.login);

router.post('/logout', auth, loginController.logout);

router.post('/refresh', refreshController.refresh);

router.post('/upgrade-guest', accountTypeController.upgradeGuest);

// free to premium -> on successful payment -> user must be logged in (FREE USER)
router.post('/free-to-premium', freeUser, accountTypeController.FreeToPremium);

export default router;
