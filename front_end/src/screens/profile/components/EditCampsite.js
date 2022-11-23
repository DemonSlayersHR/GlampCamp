import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import axios from 'axios';

export default function EditCampsite ({camp_id, setShowOptions, setEditViewVisible, getHostCampsites}) {

  const [campsiteName, setCampsiteName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  function editCampsite () {
    axios.put(`http://192.168.86.36:3000/campsites`, {
      camp_id: camp_id,
      camp_name: campsiteName,
      price: price,
      location: location,
      description: description
    })
      .then(() => {
        getHostCampsites();
        setShowOptions(false);
        setEditViewVisible(false);
      })
      .catch((err) => {console.log(err)});
  }

  return (
    <View>
      <TextInput placeholder='campsite name' style={styles.input} onChangeText={text => setCampsiteName(text)} />
      <TextInput placeholder='description' style={styles.input} onChangeText={text => setDescription(text)} />
      <TextInput placeholder='location' style={styles.input} onChangeText={text => setLocation(text)} />
      <TextInput placeholder='price' style={styles.input} onChangeText={text => setPrice(text)} />

      <View style={styles.btns}>
        <TouchableOpacity style={styles.btn} onPress={editCampsite}>
          <Text style={styles.btnText}> Edit Campsite </Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 60,
    padding: 5,
    paddingLeft: 20,
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',

  },
  btn: {
    padding: 9,
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#FFADAD',
    borderColor: '#eee',
  },
  btns: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 20,
    textAlign: 'center',
  }
});