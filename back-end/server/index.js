// set up
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

// router
app.use('/', router)

// socket logic

const server = app.listen(3000)
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:19006",
    methods: ["GET", "POST"],
    transports: ['websocket', 'polling'],
    credentials: true
  },
  allowEIO3: true
  // origins: '*:*'
});


io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  socket.on('ping', (data) => {
    io.emit('pong', {})
  })
});

// app.listen(process.env.PORT || 3000);
console.log(`Listening at http://localhost:${process.env.PORT || 3000}`);