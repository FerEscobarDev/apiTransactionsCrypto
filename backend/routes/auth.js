const { Router } = require('express');
const { check } = require('express-validator');
const { userCreate, login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();



router.post(
    '/register', 
    [
        check('name', 'El campo nombre es requerido.').not().isEmpty(),
        check('email', 'El campo email es requerido').not().isEmpty(),
        check('password', 'El campo password es requerido').isLength({ min: 6 }),
        validarCampos
    ], 
    userCreate
);

router.post('/login',
    [
        check('email', 'El campo email es requerido').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    login
);

router.get('/renew_token', renewToken);

module.exports = router;