const { Router } = require('express');
const { validarJwt } = require('../middlewares/validar-jwt');
const { getTransactions, createTransaction, updateTransaction, deleteTransaction } = require('../controllers/transactions');

const router = Router();



router.get( '/', validarJwt, getTransactions );

router.post( '/', validarJwt, createTransaction );

router.put( '/:id', validarJwt, updateTransaction );

router.delete( '/:id', validarJwt, deleteTransaction );



module.exports = router;