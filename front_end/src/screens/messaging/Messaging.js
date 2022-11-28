import React, { useEffect, useState, useRef } from 'react';
import {
  Button,
  Image,
  Text,
  TextInput,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { io } from 'socket.io-client';
import BackArrow from 'react-native-vector-icons/Feather';
import axios from 'axios';
import SingleCampsite from '../campsite/SingleCampsite.js';
import { URL } from '../../../config.js';
import moment from 'moment';
const Messaging = ({ route, navigation }) => {
  // ^ need {reserve_id, user_type}
  // ------------------------------ SET UP ------------------------------

  // test type, remove on production
  const reserve_id = useRef(3);

  // toggles test
  const connectionTest = false;

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const meta = useRef(null);

  // remove these 2 states once we have actual props
  const [user_type, setUser_type] = useState('host');
  const [user_id, setUser_id] = useState(1);

  useEffect(() => {
    axios
      .get(`http://${URL}:3000/chats/meta?reserve_id=${reserve_id.current}`)
      .then((result) => (meta.current = result.data));

    axios
      .get(`http://${URL}:3000/chats?reserve_id=${reserve_id.current}`)
      .then((result) => setMessages(result.data));

    setInterval(async () => {
      const result = await axios.get(
        `http://${URL}:3000/chats?reserve_id=${reserve_id.current}`
      );
      setMessages(result.data);
    }, 1000);
  }, []);

  // ------------------------------ FUNCTIONS ------------------------------

  const sendMessage = (e) => {
    e.preventDefault();

    axios.post(`http://${URL}:3000/chats/`, {
      messages: text,
      sender: user_id,
      reserve_id: reserve_id.current,
    });
    setMessages([
      ...messages,
      { messages: text, sender: user_id, reserve_id: reserve_id.current },
    ]);
    setText('');
  };

  const confirmRes = (e) => {
    e.preventDefault();
    axios.put(`http://${URL}:3000/reservation`, {
      reserve_id: reserve_id.current,
    });
  };

  const changeType = (e) => {
    if (e.target.value === 'client') {
      setUser_type('client');
      setUser_id(3);
    }
    if (e.target.value === 'host') {
      setUser_type('host');
      setUser_id(1);
    }
  };
  // literally here just to get react to shut up about keys
  var count = 0;

  // ------------------------------ DIV ------------------------------
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackArrow name='chevron-left' size={'5%'} color={'grey'}></BackArrow>
        <Text></Text>
        {user_type === 'host' && (
          <Button
            title='Confirm Reservation'
            onPress={confirmRes}
            style={styles.confirmBtn}></Button>
        )}
      </View>
      <ScrollView style={styles.messages}>
        {messages.map((entry, index) => {
          if (entry.reserve_id === reserve_id.current) {
            if (user_id === entry.sender) {
              return (
                <View key={count++} style={styles.textBubbleSender}>
                  <Text style={styles.sender}>{entry.messages}</Text>
                  {index === messages.length - 1 ||
                  messages[index + 1].sender !== user_id ? (
                    <Text
                      style={{
                        color: 'gray',
                        fontSize: 11,
                        marginTop: 2,
                      }}>{`${moment(entry.created_on).fromNow()}`}</Text>
                  ) : null}
                </View>
              );
            } else {
              return (
                <View key={count++} style={styles.textBubbleReceiver}>
                  <Text style={styles.receiver}>{entry.messages}</Text>
                  {index === messages.length - 1 ||
                  messages[index + 1].sender === user_id ? (
                    <Text
                      style={{
                        color: 'gray',
                        fontSize: 11,
                        marginTop: 2,
                      }}>{`${moment(entry.created_on).fromNow()}`}</Text>
                  ) : null}
                </View>
              );
            }
          }
        })}
      </ScrollView>
      <View style={styles.form}>
        <TextInput
          value={text}
          onChangeText={(e) => {
            setText(e);
          }}
          style={styles.input}></TextInput>
        <Button title='Send' onPress={sendMessage}></Button>
      </View>
      {connectionTest && (
        <View>
          <select onChange={changeType}>
            <option value='host'>host</option>
            <option value='client'>client</option>
          </select>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
    padding: 20,
    backgroundColor: 'white',
  },
  messages: {
    height: '89%',
  },
  form: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '15%',
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(158, 150, 150, .5)',
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 5,
    height: 40,
    width: '80%',
    padding: 10,
  },
  textBubbleSender: {
    alignItems: 'flex-end',
    marginBottom: 5,
  },
  textBubbleReceiver: {
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  header: {
    height: '8%',
    marginBottom: '1%',
  },
  confirmBtn: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#F4A259',
    backgroundColor: '#F4A259',
  },
  sender: {
    textAlign: 'right',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'rgba(158, 150, 150, .5)',
    padding: 10,
    backgroundColor: 'lightpink',
    overflow: 'hidden',
    marginLeft: 100,
  },
  receiver: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    backgroundColor: 'lightblue',
    borderColor: 'rgba(158, 150, 150, .5)',
    overflow: 'hidden',
    marginRight: 100,
  },
});

export default Messaging;
