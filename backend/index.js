const express = require('express');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 3000;


const app = express();

app.use(cors());

// Directorio Público
app.use( express.static('public') );

app.use(express.json());

// Rutas
app.use('/api', require('./routes/auth') );
app.use('/api/transactions', require('./routes/transactions') );
app.use();






app.listen(port, () => {
    console.log(`Aplicación escuchando en el puerto ${port}`);
});
