const { PrismaClient } = require('@prisma/client');
const express = require('express');
require('dotenv').config();
const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.get('/', async (req, res) => {
    await prisma.user.create({
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
    res.json(allUsers);
});

app.listen(port, () => {
    console.log(`Aplicación escuchando en el puerto ${port}`);
});
