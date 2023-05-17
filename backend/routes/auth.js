const { Router } = require('express');
const { check } = require('express-validator');
const { userCreate, login, renewToken } = require('../controllers/auth');
const router = Router();



router.post(
    '/register', 
    [
        check('name', 'El campo nombre es invalido.').not().isEmpty()
    ], 
    userCreate
);

router.post('/login', login);

router.get('/renew_token', renewToken);

module.exports = router;