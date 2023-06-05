const { Router } = require('express');
const { validarJwt } = require('../middlewares/validar-jwt');

const router = Router();


router.get( '/', validarJwt, getCryptos );


module.exports = router;