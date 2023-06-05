const { response } = require('express');
const prisma = require('../database/config');
const dayjs =  require('dayjs');
const axios = require('axios');
const { getCryptos } = require('../helpers/cryptos');


const getTransactions = async ( req, res = response ) => {

    try {
        const { transactions } = await prisma.user.findUnique({
            where: {
                id: req.id
            },
            include:{
                transactions: true
            }
        });

        prisma.$disconnect();
        
        const cryptos = await getCryptos();

        const newTransactions = transactions.map( transaction => {
            
            const currentPrice = cryptos[transaction.crypto].priceUsd;

            const profitAbsolute = currentPrice - transaction.priceUsd;
            const returnPercent = ((profitAbsolute/transaction.priceUsd)*100).toFixed(2);
            const returnOnTransaction = `${ returnPercent }%`;

            return { ...transaction, currentPrice, returnOnTransaction }
        });

        res.status(200).json({
            ok: true,
            newTransactions
        })
    } 
    catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error!, contacta al administrador'
        });
    }
}


const createTransaction = async ( req, res = response ) => {

    const { crypto, amountCrypto, priceUsd, active, date } = req.body;

    try {
        const transaction = await prisma.transaction.create({
            data: {
                crypto,
                amountCrypto:   Number(amountCrypto),
                priceUsd:       Number(priceUsd),
                active:         Boolean(active),
                date:           dayjs(date).$d,
                user: { connect: { id: req.id } }
            }
        });
        
        prisma.$disconnect();

        res.status(201).json({
            ok: true,
            transaction
        });        
    } 
    catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error!, contacta al administrador'
        });
    }
}

const updateTransaction = ( req, res = response ) => {



    res.status(200).json({
        ok: true,
        transaction
    })
}

const deleteTransaction = async ( req, res = response ) => {

    const idTransaction = Number(req.params.id);
    const idUser = req.id;

    try {

        const transaction = await prisma.transaction.findUnique({
            where: {
                id: idTransaction
            }
        })

        if( !transaction ){
            prisma.$disconnect();

            return res.status(404).json({
                ok: false,
                msg: 'Transacción no encontrada.'
            });
        }

        if( transaction.userId !== idUser ){
            prisma.$disconnect();

            return res.status(401).json({
                ok: false,
                msg: 'No tienes privilegios para eliminar esta transacción.'
            });
        }

        await prisma.transaction.delete({
            where: {
                id: idTransaction
            }
        });

        prisma.$disconnect();

        res.status(200).json({
            ok: true,
            msg:'Transacción eliminada correctamente.'
        });
        
    } 
    catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error!, contacta al administrador'
        });
    }

}

module.exports = {
    getTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction
}