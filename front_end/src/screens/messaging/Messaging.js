import React, { useEffect, useState } from 'react';
import { Button, Image, Text, View, ScrollView } from 'react-native';
import { io } from 'socket.io-client';

import axios from 'axios';
import SingleCampsite from '../campsite/SingleCampsite.js';


const Messaging = ({ }) => {
  const socket = io.connect("http://192.168.0.116:3000",
    {
      withCredentials: true,
      extraHeaders: {
        "my-custom-header": "abcd"
      }
    });

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('pong', () => {
      setLastPong(new Date().toISOString());
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, []);

  const sendPing = () => {
    socket.emit('ping');
  }

  socket.on('chat message', (msg) => {
    console.log(msg)
  })

  const sendMessage = (e) => {
    e.preventDefault()
  }
  // useEffect(() => {
  //   axios
  //     .get('http://10.0.0.30:3000/campsites')
  //     .then((results) => {
  //       console.log('results from successful axios request', results.data);
  //       setCampsites(results.data);
  //     })
  //     .catch((error) => {
  //       console.log('error', error);
  //     });
  // }, []);


  return (
    <View>
      <ul id="messages"></ul>
      <form id="form" action="">
        <input autocomplete="off" /><button>Send</button>
      </form>
      <p>Connected: {'' + isConnected}</p>
      <p>Last pong: {lastPong || '-'}</p>
      <button onClick={sendPing}>Send ping</button>
    </View>
  );
};

export default Messaging;