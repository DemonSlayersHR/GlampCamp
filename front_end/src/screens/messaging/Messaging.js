import React, { useEffect, useState } from 'react';
import { Button, Image, Text, View, ScrollView } from 'react-native';
import { Server } from "socket.io";
import axios from 'axios';
import SingleCampsite from '../campsite/SingleCampsite.js';

const Messaging = ({ }) => {

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
      <script src="/socket.io/socket.io.js"></script>
    </View>
  );
};

export default Messaging;