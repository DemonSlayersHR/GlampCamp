require("dotenv").config();
const express = require('express')
const path = require('path')

const app = express()
const cors = require('cors')
const morgan = require('morgan')
const router = require('./router.js')
app.use(cors())
app.use(morgan('dev'))
app.use(express.json());

// Uncomment/edit below to serve static site
// app.use(express.static(path.join(__dirname, '../client/dist')))

app.use('/', router)
app.listen(process.env.PORT || 3000);
console.log(`Listening at http://localhost:${process.env.PORT || 3000}`);