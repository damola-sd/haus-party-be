const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

import { startDb } from './database/db';

startDb();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => { res.send("Welcome to the Haus Party Backend")})

const PORT = process.env.PORT
app.all('*', (req, res) => { return res.status(404).json({ message: 'This endpoint does not seem to exist, look at the url again' }) })
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})