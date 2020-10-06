const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

import { startDb } from './database/db';

const jsonParser = bodyParser.json();

startDb();
app.use(jsonParser);
app.use('/api/v1', routes);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => { res.send("Welcome to the Haus Party Backend")})

const PORT = process.env.PORT
app.all('*', (req, res) => { return res.status(404).json({ message: 'This endpoint does not seem to exist, look at the url again' }) })
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})