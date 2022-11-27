import React, { useEffect, useState, useRef } from 'react';
import { Button, Image, Text, TextInput, View, ScrollView, StyleSheet } from 'react-native';
import { io } from 'socket.io-client';
import BackArrow from 'react-native-vector-icons/Feather'
import axios from 'axios';
import SingleCampsite from '../campsite/SingleCampsite.js';
import { URL } from '../../../config.js';


const Messaging = ({ }) => {
  // ^ need {reserve_id, user_type}
  // ------------------------------ SET UP ------------------------------

  // test type, remove on production
  const user_type = useRef('host')
  const user_id = 2
  const reserve_id = useRef(2)

  // toggles ping pong test
  const connectionTest = false

  // set up socket connection (must be first)
  const socket = io.connect(`http://${URL}:3000`,
    {
      withCredentials: true,
    });

  //set up states
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const meta = useRef(null)

  useEffect(() => {
    axios.get(`http://${URL}:3000/chats/meta?reserve_id=${reserve_id.current}`)
      .then(result => meta.current = result.data)

    axios.get(`http://${URL}:3000/chats?reserve_id=${reserve_id.current}`)
      .then(result => setMessages(result.data))

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

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages([...messages, msg])
    })
  }, [socket, messages])
  // ------------------------------ FUNCTIONS ------------------------------

  const sendPing = () => {
    socket.emit('ping');
  }

  const sendMessage = async (e) => {
    e.preventDefault()
    await axios.post(`http://${URL}:3000/chats/`, { messages: text, sender: user_id, reserve_id: reserve_id.current })
    socket.emit('chat message', { messages: text, sender: user_id, reserve_id: reserve_id.current })
    setText('')
  }

  const confirmRes = (e) => {
    e.preventDefault()
    axios.put(`http://${URL}:3000/reservation`, { reserve_id: reserve_id.current })
  }
  // literally here just to get react to shut up about keys
  var count = 0

  // ------------------------------ DIV ------------------------------
  return (
    <View>
      <View style={styles.header} >
        <BackArrow name='chevron-left' size={'5vh'} color={'grey'}></BackArrow>
        <Text></Text>
        {user_type.current === 'host' && <Button title="Confirm Reservation" onPress={confirmRes} style={styles.confirmBtn}></Button>}
        {user_type.current === 'client' && <Text>Reservation not yet confirmed</Text>}
      </View>
      <ScrollView style={styles.messages}>
        {messages.map(entry => {
          if (entry.reserve_id === reserve_id.current) return <Text key={count++}>{entry.messages}</Text>
        })}
      </ScrollView>
      <View style={styles.form}>
        <TextInput value={text} onChange={(e) => setText(e.target.value)} style={styles.input}></TextInput>
        <Button title='Send' onPress={sendMessage}></Button>
      </View>
      {connectionTest && <View>
        <p>Connected: {'' + isConnected}</p>
        <p>Last pong: {lastPong || '-'}</p>
        <button onClick={sendPing}>Send ping</button>
      </View>}
    </View>
  );
};

{/* <View style={styles.container}></View> */ }
const styles = StyleSheet.create({
  messages: {
    height: '89vh',
    'border-top': '1px solid black'
  },
  form: {
    display: 'grid',
    'grid-template-columns': '9fr 1fr',
    height: '5vh'
  },
  input: {
    border: '1px solid black'
  },
  header: {
    display: 'grid',
    'grid-template-columns': '2fr 6fr 2fr',
    height: '5vh',
    // 'border-bottom': '2px solid black',
    'margin-bottom': '1vh'
  },
  confirmBtn: {
    color: 'green',
    height: '100%'
  }
}
)

export default Messaging;