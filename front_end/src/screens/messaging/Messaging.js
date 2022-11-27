import React, { useEffect, useState, useRef } from 'react';
import { Button, Image, Text, TextInput, View, ScrollView, StyleSheet } from 'react-native';
import { io } from 'socket.io-client';
import BackArrow from 'react-native-vector-icons/Feather'
import axios from 'axios';
import SingleCampsite from '../campsite/SingleCampsite.js';
import { URL } from '../../../config.js';


const Messaging = ({ route, navigation }) => {
  // ^ need {reserve_id, user_type}
  // ------------------------------ SET UP ------------------------------

  // test type, remove on production
  const reserve_id = useRef(3)

  // toggles test
  const connectionTest = true

  // set up socket connection (must be first)
  // const socket = io.connect(`http://${URL}:3000`,
  //   {
  //     withCredentials: true,
  //   });

  //set up states
  // const [isConnected, setIsConnected] = useState(socket.connected);
  // const [lastPong, setLastPong] = useState(null);
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const meta = useRef(null)

  // remove these 2 states once we have actual props
  const [user_type, setUser_type] = useState('host')
  const [user_id, setUser_id] = useState(1)

  useEffect(() => {
    axios.get(`http://${URL}:3000/chats/meta?reserve_id=${reserve_id.current}`)
      .then(result => meta.current = result.data)

    axios.get(`http://${URL}:3000/chats?reserve_id=${reserve_id.current}`)
      .then(result => setMessages(result.data))

    setInterval(async () => {
      const result = await axios.get(`http://${URL}:3000/chats?reserve_id=${reserve_id.current}`)
      setMessages(result.data)
    }, 1000)
    // socket.on('connect', () => {
    //   setIsConnected(true);
    // });

    // socket.on('disconnect', () => {
    //   setIsConnected(false);
    // });

    // socket.on('pong', () => {
    //   setLastPong(new Date().toISOString());
    // });

    // return () => {
    //   socket.off('connect');
    //   socket.off('disconnect');
    //   socket.off('pong');
    // };
  }, []);

  // useEffect(() => {
  //   socket.on('chat message', (msg) => {
  //     setMessages([...messages, msg])
  //   })
  // }, [socket, messages])
  // ------------------------------ FUNCTIONS ------------------------------

  // const sendPing = () => {
  //   socket.emit('ping');
  // }

  const sendMessage = (e) => {
    e.preventDefault()
    axios.post(`http://${URL}:3000/chats/`, { messages: text, sender: user_id, reserve_id: reserve_id.current })
    setMessages([...messages, { messages: text, sender: user_id, reserve_id: reserve_id.current }])
    // socket.emit('chat message', { messages: text, sender: user_id, reserve_id: reserve_id.current })
    setText('')
  }

  const confirmRes = (e) => {
    e.preventDefault()
    axios.put(`http://${URL}:3000/reservation`, { reserve_id: reserve_id.current })
  }

  const changeType = (e) => {
    if (e.target.value === 'client') {
      setUser_type('client')
      setUser_id(3)
    }
    if (e.target.value === 'host') {
      setUser_type('host')
      setUser_id(1)
    }
  }
  // literally here just to get react to shut up about keys
  var count = 0

  // ------------------------------ DIV ------------------------------
  return (
    <View>
      <View style={styles.header} >
        <BackArrow name='chevron-left' size={'5vh'} color={'grey'}></BackArrow>
        <Text></Text>
        {user_type === 'host' && <Button title="Confirm Reservation" onPress={confirmRes} style={styles.confirmBtn}></Button>}
      </View>
      <ScrollView style={styles.messages}>
        {messages.map(entry => {
          if (entry.reserve_id === reserve_id.current) {
            if (user_id === entry.sender) {
              return <Text key={count++} style={styles.sender}>{entry.messages}</Text>
            } else {
              return <Text key={count++} style={styles.reciever}>{entry.messages}</Text>
            }
          }
        })}
      </ScrollView>
      <View style={styles.form}>
        <TextInput value={text} onChange={(e) => setText(e.target.value)} style={styles.input}></TextInput>
        <Button title='Send' onPress={sendMessage}></Button>
      </View>
      {connectionTest && <View>
        {/* <p>Connected: {'' + isConnected}</p>
        <p>Last pong: {lastPong || '-'}</p>
        <button onClick={sendPing}>Send ping</button> */}
        <select onChange={changeType}>
          <option value='host'>host</option>
          <option value='client'>client</option>
        </select>
      </View>}
    </View>
  );
};


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
    height: '100%',
    float: 'right'
  },
  sender: {
    textAlign: 'right'
  },
  reciever: {

  }
}
)

export default Messaging;