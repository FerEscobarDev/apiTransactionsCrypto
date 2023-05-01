const { response } = require('express');

const userCreate = async (req, res = response) => {

    console.log(req.body);
    /* await prisma.user.create({
        data: {
            name: 'Alice2',
            email: 'alice2@prisma.io',
            posts: {
                create: { title: 'Hello World' },
            },
            profile: {
                create: { bio: 'I like turtles' },
            },
        },
    })

    const allUsers = await prisma.user.findMany({
        include: {
            posts: true,
            profile: true,
        },
    })

    await prisma.$disconnect()
    console.dir(allUsers, { depth: null }) 
    res.json(allUsers);  */
    res.json({
        ok: true,
        msg: 'Register'
    });
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