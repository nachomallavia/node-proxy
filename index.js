const express = require('express');
const cors = require('cors');

const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = 3000;
const API_TOKEN = process.env.API_TOKEN;

// Enable CORS
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

app.get('/', (req, res) => {
    res.send('type /:id to get the report');
});

app.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const response = await fetch(
            `https://sistema.mundoamtae.com/alianzas/Api/SalesForce/GetReporteEstadoCuenta/${API_TOKEN}/${id}`
        );
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get('/resumido/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const response = await fetch(
            `https://sistema.mundoamtae.com/alianzas/Api/SalesForce/GetReporteEstadoCuentaResumido/${API_TOKEN}/${id}`
        );
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
