const { Router } = require('express');
const { userCreate, login, renewToken } = require('../controllers/auth');
const router = Router();



router.post('/register', userCreate);

router.post('/login', login);

router.get('/renew_token', renewToken);

module.exports = router;