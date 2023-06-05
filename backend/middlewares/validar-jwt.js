const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJwt = ( req, res = response, next ) => {
// x-token header
    const token = req.header('x-token');
    
    if( !token ){
        return res.status(401).json({
            ok: false,
            msg: 'No existe un token en la petición.'
        });
    }

    try {
        
        const { id, name } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        req.id = id;
        req.name = name;

    } 
    catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido.'
        });
    }

    next();
}

module.exports = {
    validarJwt
}