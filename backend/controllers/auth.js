const { response } = require('express');
const prisma = require('../database/config');
const { validationResult } = require('express-validator')
const { bcrypt } = require('bcryptjs');

const userCreate = async (req, res = response) => {

    const errors = validationResult( req );
    const { email, password } = req.body;

    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }
    console.log('Lo logramos ahora si fue qué alegría')

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
        // const salt = bcrypt.genSaltSync();
        // user.password = bcrypt.hashSync( password, salt );

        console.log(user)
        // await prisma.user.create({
        //     data: user,
        // })
        // await usuario.save();

        // // Generar JWT
        // const token = await generarJWT( usuario.id, usuario.name );
    
        // res.status(201).json({
        //     ok: true,
        //     uid: usuario.id,
        //     name: usuario.name,
        //     token
        // })
        await prisma.$disconnect()
    // console.dir(allUsers, { depth: null }) 
    // res.json(allUsers);
    res.json({
        ok: true,
        msg: 'Register ok'
    });
        
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

    res.json({
        ok: true,
        msg: 'Login'
    });
}

const renewToken = async (req, res = response) => {

    res.json({
        ok: true,
        msg: 'RenewToken'
    });
}



module.exports = {
    userCreate,
    login,
    renewToken,
}