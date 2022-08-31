const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('colors')
require('dotenv').config()

const connectDB = require('./config/db');

// Auth Router
const sign_in = require('./src/routes/auth_route')
const membership = require('./src/routes/membership_route')
const port = 3500

app.use(cors());

app.get('/' , (req, res)=>{
    res.send('Welcome to Blood')
})

app.use('/api/v1/auth' , sign_in)
app.use('/api/v1/membership',membership)

connectDB()

const server = app.listen(port ,() => {
    console.log(
        `App listening on port ${port}`
    );
})
