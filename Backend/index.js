const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const env = require('dotenv');
const authroute = require('./routes/auth');

env.config();
const app = express();
var corsOptions = {
    origin: 'http://localhost:3000/',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        return app.listen({ port: PORT })
    })
    .then(() => {
        console.log('Server Running at PORT 5000');
    })
    .catch((err) => console.log(err));

app.get('/', (reg, res) => {
    res.send('Welcome to Tasky');
})

app.use('/auth', authroute);

