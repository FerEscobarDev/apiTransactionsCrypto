const { PrismaClient } = require('@prisma/client');
const express = require('express');
require('dotenv').config();
const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3000;


// Directorio Público
app.use( express.static('public') );

app.use(express.json());

// Rutas
app.use('/api', require('./routes/auth') );
//app.use('/api/events', require('./routes/events') );






app.listen(port, () => {
    console.log(`Aplicación escuchando en el puerto ${port}`);
});
