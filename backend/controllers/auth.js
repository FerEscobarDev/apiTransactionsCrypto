const { response } = require('express');
const prisma = require('../database/config');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const userCreate = async (req, res = response) => {
    
    const { email, password } = req.body;

    try {
        let user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        })

        if ( user ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe'
            });
        }

        user = req.body;
  
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        const newUser = await prisma.user.create({
            data: user,
        });

        // Generar JWT
        const token = await generarJWT( user.id, user.name );

        await prisma.$disconnect()
    
        res.status(201).json({
            ok: true,
            user:{
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            },
            token
        })
    // console.dir(allUsers, { depth: null }) 
    // res.json(allUsers);
    // res.json({
    //     ok: true,
    //     msg: 'Register ok'
    // });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error!, contacta al administrador'
        });
    }

    // const user = req.body
    // console.log(req.body);
    

    // const allUsers = await prisma.user.findMany({
    //     include: {
    //         posts: true,
    //         profile: true,
    //     },
    // })

    
}

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try{
        let user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        })

        if ( !user ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo o la contraseña no coinciden con nuestros registros.'
            });
        }

        const validarPassword = bcrypt.compareSync( password, user.password );

        if ( !validarPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo o la contraseña no coinciden con nuestros registros.'
            });
        }

        const token = await generarJWT( user.id, user.name );

        await prisma.$disconnect()
    
        res.status(200).json({
            ok: true,
            user:{
                id: user.id,
                name: user.name,
                email: user.email
            },
            token
        })
    }
    catch(error){
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error!, contacta al administrador'
        });
    }
}

const renewToken = async (req, res = response) => {

    const { id, name } = req;

    const token = await generarJWT( id, name );

    res.json({
        ok: true,
        user:{
            id: id,
            name: name
        },
        token
    });
}



module.exports = {
    userCreate,
    login,
    renewToken,
}