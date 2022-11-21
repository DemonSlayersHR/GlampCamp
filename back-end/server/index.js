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
app.use(express.static(path.join(__dirname, '../client/dist')))

// uncomment below to test socketio
app.use('/', router)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/socketio.html');
});

const server = app.listen(3000)
const { Server } = require("socket.io");
const io = new Server(server);

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

// app.listen(process.env.PORT || 3000);
console.log(`Listening at http://localhost:${process.env.PORT || 3000}`);